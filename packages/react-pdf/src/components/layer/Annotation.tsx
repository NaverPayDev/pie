import {memo, useCallback, useMemo, useState} from 'react'

import classNames from 'classnames/bind'
import {AnnotationLayer as PdfAnnotationLayer} from 'pdfjs-dist/legacy/build/pdf.mjs'

import styles from './Annotation.module.scss'
import {usePdfPageContext} from '../../contexts/page'
import {usePdfContext} from '../../contexts/pdf'
import {useIsomorphicLayoutEffect} from '../../hooks/useIsomorphicLayoutEffect'
import PDFLinkService from '../../utils/link-service'

import type {AnnotationLayerParameters} from 'pdfjs-dist/types/src/display/annotation_layer'

const cx = classNames.bind(styles)

export const AnnotationLayer = memo(function AnnotationLayer() {
    const {externalLinkTarget} = usePdfContext()
    const {page, scale} = usePdfPageContext()
    const [annotations, setAnnotations] = useState<any>() // eslint-disable-line @typescript-eslint/no-explicit-any

    useIsomorphicLayoutEffect(() => {
        async function init() {
            const annotationContents = await page.getAnnotations()
            setAnnotations(annotationContents)
        }
        init()
    }, [page])

    const pdfLinkService = useMemo(() => {
        const linkService = new PDFLinkService()
        linkService.setExternalLinkTarget(externalLinkTarget)
        return linkService
    }, [externalLinkTarget])

    const drawAnnotation = useCallback(
        (element: HTMLDivElement | null) => {
            requestAnimationFrame(async () => {
                if (!element) {
                    return
                }

                /**
                 * rerender 전에 해당 layer를 초기화합니다.
                 */
                Array.from(element.children).forEach((el) => el.remove())

                const viewport = page.getViewport({scale}).clone({dontFlip: true})

                const annotationLayerParameters = {
                    // useless parameters
                    accessibilityManager: null,
                    annotationCanvasMap: null,
                    annotationEditorUIManager: null,
                    l10n: null,
                    structTreeLayer: null,
                    // required parameters
                    div: element,
                    page,
                    viewport,
                }

                const parameters: AnnotationLayerParameters = {
                    annotations,
                    div: element,
                    linkService: pdfLinkService,
                    page,
                    renderForms: false,
                    viewport,
                }

                await new PdfAnnotationLayer(annotationLayerParameters).render(parameters).catch(() => {
                    // Do nothing
                })

                // element 크기 설정: SCSS에서 width: 100% / height: 100%는 부모 크기 기준
                // 실제 픽셀 크기를 명시해야 a 태그 크기가 결정됨
                // annotation layer 컨테이너의 크기를 viewport에 맞춰 설정하여 내부의 모든 a 태그가 올바른 클릭 영역을 가지도록 함
                element.style.width = Math.floor(viewport.width) + 'px'
                element.style.height = Math.floor(viewport.height) + 'px'

                const aTags = Array.from(element.getElementsByTagName('a'))

                if (aTags.length > 0) {
                    for (const elem of aTags as HTMLAnchorElement[]) {
                        elem.style.position = 'absolute'
                        elem.style.top = '0'
                        elem.style.left = '0'
                        elem.style.width = '100%'
                        elem.style.height = '100%'
                        elem.style.cursor = 'pointer'
                    }
                }
            })
        },
        [annotations, pdfLinkService, page, scale],
    )

    if (!annotations) {
        return null
    }

    return <div ref={drawAnnotation} className={cx('annotationLayer')} />
})
