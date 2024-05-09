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

                const canvasViewport = page.getViewport({scale: 1 * getPixelRatio()})
                const renderViewport = page.getViewport({scale: 1})

                canvas.width = canvasViewport.width
                canvas.height = canvasViewport.height

                canvas.style.width = `${Math.floor(renderViewport.width)}px`
                canvas.style.height = 'auto'

                page.render({canvasContext, viewport: canvasViewport})
            })
        },
        [page],
    )

    return <canvas ref={drawCanvas} dir="ltr" />
})
