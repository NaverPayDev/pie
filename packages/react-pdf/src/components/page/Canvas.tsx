import {memo, useCallback, useRef} from 'react'

import {usePdfPageContext} from '../../contexts/page'
import {getPixelRatio} from '../../utils/pdf'

import type {RenderTask} from 'pdfjs-dist'

export const PageCanvas = memo(function PageCanvas() {
    const pageRenderTask = useRef<RenderTask>()

    const renderingId = useRef(0)

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

                // Generate new rendering ID (for tracking the last request)
                const currentRenderingId = ++renderingId.current

                const canvasViewport = page.getViewport({scale: scale * getPixelRatio()})

                canvas.width = canvasViewport.width
                canvas.height = canvasViewport.height

                canvas.style.width = `${Math.floor(renderViewport.width)}px`
                canvas.style.height = `${Math.floor(renderViewport.height)}px`

                pageRenderTask.current = page.render({canvasContext, viewport: canvasViewport})

                pageRenderTask.current.promise.catch((error) => {
                    // Ignore errors if they are not from the latest rendering
                    if (currentRenderingId !== renderingId.current) {
                        return
                    }

                    throw error
                })
            })
        },
        [page, renderViewport.height, renderViewport.width, scale],
    )

    return <canvas ref={drawCanvas} dir="ltr" />
})
