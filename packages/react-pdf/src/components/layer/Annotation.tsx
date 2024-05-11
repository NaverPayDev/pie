/* eslint-disable @typescript-eslint/ban-ts-comment */
import {memo, useCallback, useState} from 'react'

import classNames from 'classnames/bind'
import {usePdfPageContext} from 'src/contexts/page'

import {usePdfContext} from '../../contexts/pdf'
import {useIsomorphicLayoutEffect} from '../../hooks/useIsomorphicLayoutEffect'
// @ts-ignore
import * as pdfjs from '../../pdfjs-dist/legacy/build/pdf'
// @ts-ignore
import {PDFLinkService} from '../../pdfjs-dist/lib/web/pdf_link_service'
import styles from './Annotation.module.scss'

import type {PDFAnnotations} from '../../pdfjs-dist/types/pdfjs'

const cx = classNames.bind(styles)

function getExternalLinkTargetValue(externalLinkTarget?: '_self' | '_blank' | '_parent' | '_top') {
    switch (externalLinkTarget) {
        case '_self':
            return 1
        case '_blank':
            return 2
        case '_parent':
            return 3
        case '_top':
            return 4
        default:
            return 0
    }
}

export const AnnotationLayer = memo(function AnnotationLayer() {
    const {externalLinkTarget} = usePdfContext()
    const {page} = usePdfPageContext()
    const [annotations, setAnnotations] = useState<PDFAnnotations | undefined>()

    useIsomorphicLayoutEffect(() => {
        async function init() {
            const annotationContents = await page.getAnnotations()
            setAnnotations(annotationContents)
        }
        init()
    }, [page])

    const drawAnnotation = useCallback(
        (element: HTMLDivElement | null) => {
            requestAnimationFrame(() => {
                if (!element) {
                    return
                }
                const linkService = new PDFLinkService({
                    externalLinkTarget: getExternalLinkTargetValue(externalLinkTarget),
                })
                const viewport = page.getViewport({scale: 1}).clone({dontFlip: true})
                const parameters = {
                    annotations,
                    div: element,
                    linkService,
                    page,
                    renderInteractiveForms: false,
                    viewport,
                }

                try {
                    pdfjs?.AnnotationLayer?.render(parameters)
                } catch {}

                const children = element.children

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
        [annotations, externalLinkTarget, page],
    )

    if (!annotations) {
        return null
    }

    return <div ref={drawAnnotation} className={cx('annotationLayer')} />
})
