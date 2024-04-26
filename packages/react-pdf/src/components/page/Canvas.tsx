import {memo, useCallback} from 'react'

import {getPixelRatio} from '../../utils/pdf'

import type {PDFPageProxy} from '../../pdfjs-dist/types/pdfjs'

interface PageCanvasProps {
    page: PDFPageProxy
}

export const PageCanvas = memo(function PageCanvas({page}: PageCanvasProps) {
    const drawCanvas = useCallback(
        (canvas: HTMLCanvasElement | null) => {
            requestAnimationFrame(() => {
                if (!canvas) {
                    return
                }

                const canvasContext = canvas.getContext('2d')
                if (!canvasContext) {
                    return
                }

                const viewport = page.getViewport({scale: 1 * getPixelRatio()})

                canvas.width = viewport.width
                canvas.height = viewport.height

                canvas.style.width = `${Math.min(Math.floor(viewport.width), 568)}px`
                canvas.style.height = 'auto'

                page.render({canvasContext, viewport})
            })
        },
        [page],
    )

    return <canvas ref={drawCanvas} dir="ltr" />
})
