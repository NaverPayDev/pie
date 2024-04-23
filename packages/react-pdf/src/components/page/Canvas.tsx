import {memo, useCallback} from 'react'

import {usePdfContext} from '../../contexts/pdf'

interface PageCanvasProps {
    pageNumber: number
}

export const PageCanvas = memo(function PageCanvas({pageNumber}: PageCanvasProps) {
    const {pdf} = usePdfContext()

    const drawCanvas = useCallback(
        async (canvas: HTMLCanvasElement | null) => {
            if (!canvas) {
                return
            }

            const canvasContext = canvas.getContext('2d')
            if (!canvasContext) {
                return
            }

            const page = await pdf.getPage(pageNumber)
            const viewport = page.getViewport({scale: 1, rotation: 0})

            canvas.width = viewport.width
            canvas.height = viewport.height
            page.render({canvasContext, viewport})
        },
        [pageNumber, pdf],
    )

    return <canvas ref={drawCanvas} />
})
