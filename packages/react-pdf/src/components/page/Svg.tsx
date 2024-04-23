import {memo, useCallback} from 'react'

import {usePdfContext} from '../../contexts/pdf'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as pdfjs from '../../pdfjs-dist/legacy/build/pdf'

interface PageSvgProps {
    pageNumber: number
}

export const PageSvg = memo(function PageSvg({pageNumber}: PageSvgProps) {
    const {pdf} = usePdfContext()

    const drawSvg = useCallback(
        async (element: HTMLDivElement | null) => {
            if (!element) {
                return
            }

            const page = await pdf.getPage(pageNumber)
            const viewport = page.getViewport({scale: 1, rotation: 0})
            const operatorList = await page.getOperatorList()

            element.setAttribute('width', `${viewport.width}px`)
            element.setAttribute('height', `${viewport.height}px`)

            const svgGfx = new pdfjs.SVGGraphics(page.commonObjs, page.objs)
            const svg = await svgGfx.getSVG(operatorList, viewport)
            element.appendChild(svg)
        },
        [pageNumber, pdf],
    )

    return <div ref={drawSvg} />
})
