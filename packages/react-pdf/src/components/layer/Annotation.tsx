import {memo, useCallback, useState} from 'react'

import classNames from 'classnames/bind'

import {usePdfContext} from '../../contexts/pdf'
import {useIsomorphicLayoutEffect} from '../../hooks/useIsomorphicLayoutEffect'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as pdfjs from '../../pdfjs-dist/legacy/build/pdf'
import styles from './Annotation.module.scss'

import type {PDFAnnotations, PDFPageProxy} from '../../pdfjs-dist/types/pdfjs'

const cx = classNames.bind(styles)

interface AnnotationLayerProps {
    page: PDFPageProxy
}

export const AnnotationLayer = memo(function AnnotationLayer({page}: AnnotationLayerProps) {
    const {linkService} = usePdfContext()
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
            if (!element) {
                return
            }
            const viewport = page.getViewport({scale: 1}).clone({dontFlip: true})
            const parameters = {annotations, div: element, linkService, page, renderInteractiveForms: false, viewport}

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
        },
        [annotations, linkService, page],
    )

    if (!annotations) {
        return null
    }

    return <div ref={drawAnnotation} className={cx('annotationLayer')} />
})
