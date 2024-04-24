import {memo, useState} from 'react'

import {useIsomorphicLayoutEffect} from '../../hooks/useIsomorphicLayoutEffect'
import {PDFAnnotations} from '../../pdfjs-dist/types/pdfjs'

import type {PDFPageProxy} from '../../pdfjs-dist/types/pdfjs'

interface AnnotationLayerProps {
    page: PDFPageProxy
}

export const AnnotationLayer = memo(function AnnotationLayer({page}: AnnotationLayerProps) {
    const [annotations, setAnnotations] = useState<PDFAnnotations | undefined>()

    useIsomorphicLayoutEffect(() => {
        async function init() {
            const annotationContents = await page.getAnnotations()
            setAnnotations(annotationContents)
        }
        init()
    }, [page])

    if (!annotations) {
        return null
    }

    return null
})
