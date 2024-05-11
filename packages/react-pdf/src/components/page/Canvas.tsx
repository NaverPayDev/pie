import {memo, useCallback} from 'react'

import {usePdfPageContext} from 'src/contexts/page'

import {getPixelRatio} from '../../utils/pdf'

export const PageCanvas = memo(function PageCanvas() {
    const {page} = usePdfPageContext()

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

                canvas.style.width = `${Math.min(Math.floor(renderViewport.width), 568)}px`
                canvas.style.height = 'auto'

                page.render({canvasContext, viewport: canvasViewport})
            })
        },
        [page],
    )

    return <canvas ref={drawCanvas} dir="ltr" />
})
