import React, {useEffect, useState} from 'react'

import {getPdfDocument} from '../dist/cjs'
import * as pdfjs from '../dist/cjs/pdf'

import type {PDFDocumentProxy} from '../src/pdfjs-dist/types/pdfjs'

const meta = {
    title: 'React PDF',
    component: 기본_SVG,
}
export default meta

const PDF_URL =
    'https://fs.pstatic.net/contents/resource/loan/personal-compare/required/0/1668583261818/gi_creditLoanNF_02.pdf'

export function 기본_SVG() {
    const [pdfInfo, setPdfInfo] = useState<PDFDocumentProxy | undefined>()

    useEffect(() => {
        ;(async () => {
            const pdf = await getPdfDocument({file: PDF_URL})
            setPdfInfo(pdf)
        })()
    }, [])

    if (!pdfInfo) {
        return null
    }

    return (
        <>
            {Array.from({length: pdfInfo.numPages}).map((_, index) => {
                return (
                    <div
                        key={index}
                        ref={async (node) => {
                            if (!node) {
                                return
                            }
                            const page = await pdfInfo.getPage(index + 1)
                            const viewport = page.getViewport({scale: 1, rotation: 0})
                            const operatorList = await page.getOperatorList()

                            node.setAttribute('width', `${viewport.width}px`)
                            node.setAttribute('height', `${viewport.height}px`)

                            const svgGfx = new pdfjs.SVGGraphics(page.commonObjs, page.objs)
                            const svg = await svgGfx.getSVG(operatorList, viewport)
                            node.appendChild(svg)
                        }}
                    />
                )
            })}
        </>
    )
}
