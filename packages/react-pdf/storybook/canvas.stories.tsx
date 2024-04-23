import React, {useEffect, useState} from 'react'

import {getPdfDocument} from '../dist/cjs'

import type {PDFDocumentProxy} from '../src/pdfjs-dist/types/pdfjs'

const meta = {
    title: 'React PDF',
    component: 기본_Canvas,
}
export default meta

const PDF_URL =
    'https://fs.pstatic.net/contents/resource/loan/personal-compare/required/0/1668583261818/gi_creditLoanNF_02.pdf'

export function 기본_Canvas() {
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
                    <canvas
                        key={index}
                        ref={async (node) => {
                            if (!node) {
                                return
                            }
                            const page = await pdfInfo.getPage(index + 1)
                            const viewport = page.getViewport({scale: 1, rotation: 0})
                            const canvasContext = node.getContext('2d')
                            if (!canvasContext) {
                                return
                            }
                            node.width = viewport.width
                            node.height = viewport.height
                            page.render({canvasContext, viewport, renderInteractiveForms: false})
                        }}
                    />
                )
            })}
        </>
    )
}
