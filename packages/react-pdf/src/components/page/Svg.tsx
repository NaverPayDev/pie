import {memo, useCallback, useRef} from 'react'

import {usePdfPageContext} from '../../contexts/page'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as pdfjs from '../../pdfjs-dist/legacy/build/pdf'

export const PageSvg = memo(function PageSvg() {
    const preSvgElement = useRef<SVGSVGElement>()
    const {page, scale, rotate} = usePdfPageContext()

    const drawSvg = useCallback(
        async (element: HTMLDivElement | null) => {
            requestAnimationFrame(async () => {
                if (!element) {
                    return
                }

                preSvgElement.current?.remove()

                const viewport = page.getViewport({scale, rotation: rotate || 0})
                const operatorList = await page.getOperatorList()

                element.setAttribute('width', `${Math.floor(viewport.width)}px`)
                element.setAttribute('height', `${Math.floor(viewport.height)}px`)

                const svgGfx = new pdfjs.SVGGraphics(page.commonObjs, page.objs)
                const svg = await svgGfx.getSVG(operatorList, viewport)
                preSvgElement.current = svg
                element.appendChild(svg)
            })
        },
        [page, rotate, scale],
    )

    return <div ref={drawSvg} />
})
