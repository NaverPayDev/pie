import {memo, useCallback} from 'react'

import type {PDFPageProxy} from '../../pdfjs-dist/types/pdfjs'

interface PageCanvasProps {
    page: PDFPageProxy
}

export const PageCanvas = memo(function PageCanvas({page}: PageCanvasProps) {
    const drawCanvas = useCallback(
        async (canvas: HTMLCanvasElement | null) => {
            if (!canvas) {
                return
            }

            const canvasContext = canvas.getContext('2d')
            if (!canvasContext) {
                return
            }

            const viewport = page.getViewport({scale: 1, rotation: 0})

            canvas.width = viewport.width
            canvas.height = viewport.height
            page.render({canvasContext, viewport})
        },
        [page],
    )

    return <canvas ref={drawCanvas} />
})
