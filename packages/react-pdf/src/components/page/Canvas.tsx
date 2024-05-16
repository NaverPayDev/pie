import {memo, useCallback} from 'react'

import {usePdfPageContext} from '../../contexts/page'
import {getPixelRatio} from '../../utils/pdf'

export const PageCanvas = memo(function PageCanvas() {
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

                const canvasViewport = page.getViewport({scale: scale * getPixelRatio()})

                canvas.width = canvasViewport.width
                canvas.height = canvasViewport.height

                canvas.style.width = `${Math.floor(renderViewport.width)}px`
                canvas.style.height = `${Math.floor(renderViewport.height)}px`

                page.render({canvasContext, viewport: canvasViewport})
            })
        },
        [page, renderViewport.height, renderViewport.width, scale],
    )

    return <canvas ref={drawCanvas} dir="ltr" />
})
