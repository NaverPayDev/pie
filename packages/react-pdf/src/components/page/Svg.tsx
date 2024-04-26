import {memo, useCallback} from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as pdfjs from '../../pdfjs-dist/legacy/build/pdf'

import type {PDFPageProxy} from '../../pdfjs-dist/types/pdfjs'

interface PageSvgProps {
    page: PDFPageProxy
}

export const PageSvg = memo(function PageSvg({page}: PageSvgProps) {
    const drawSvg = useCallback(
        async (element: HTMLDivElement | null) => {
            requestAnimationFrame(async () => {
                if (!element) {
                    return
                }

                const viewport = page.getViewport({scale: 1, rotation: 0})
                const operatorList = await page.getOperatorList()

                element.setAttribute('width', `${Math.min(Math.floor(viewport.width), 568)}px`)
                element.setAttribute('height', `${viewport.height}px`)

                const svgGfx = new pdfjs.SVGGraphics(page.commonObjs, page.objs)
                const svg = await svgGfx.getSVG(operatorList, viewport)
                element.appendChild(svg)
            })
        },
        [page],
    )

    return <div ref={drawSvg} />
})
