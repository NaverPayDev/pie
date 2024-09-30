import {memo, useCallback, useRef} from 'react'

import {usePdfPageContext} from '../../contexts/page'
import {PDFRenderTask} from '../../pdfjs-dist/types/pdfjs'
import {getPixelRatio} from '../../utils/pdf'

export const PageCanvas = memo(function PageCanvas() {
    const pageRenderTask = useRef<PDFRenderTask>()
    const {page, viewport: renderViewport, scale} = usePdfPageContext()

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

                pageRenderTask.current?.cancel()

                const canvasViewport = page.getViewport({scale: scale * getPixelRatio()})

                canvas.width = canvasViewport.width
                canvas.height = canvasViewport.height

                canvas.style.width = `${Math.floor(renderViewport.width)}px`
                canvas.style.height = `${Math.floor(renderViewport.height)}px`

                pageRenderTask.current = page.render({canvasContext, viewport: canvasViewport})
            })
        },
        [page, renderViewport.height, renderViewport.width, scale],
    )

    return <canvas ref={drawCanvas} dir="ltr" />
})
