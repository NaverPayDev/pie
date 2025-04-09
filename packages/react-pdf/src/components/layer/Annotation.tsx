import 'core-js/features/promise/with-resolvers'

import {memo, useCallback, useMemo, useState} from 'react'

import classNames from 'classnames/bind'
import {AnnotationLayer as PdfAnnotationLayer} from 'pdfjs-dist'

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
                const children = element.children
                Array.from(children).map((el) => el.remove())

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

                if (children.length > 0 && children?.[0]) {
                    const firstChildren = children[0] as HTMLElement
                    firstChildren.style.position = 'absolute'

                    const aTags = firstChildren.getElementsByTagName('a') as unknown as HTMLAnchorElement[]

                    if (aTags.length > 0) {
                        for (const elem of aTags) {
                            elem.style.position = 'absolute'
                            elem.style.top = '0'
                            elem.style.left = '0'
                            elem.style.width = '100%'
                            elem.style.height = '100%'
                        }
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
