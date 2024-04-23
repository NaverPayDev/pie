import React, {useEffect, useState} from 'react'

import {getPdfDocument} from '../dist/cjs'

import type {PDFDocumentProxy} from '../src/pdfjs-dist/types/pdfjs'

const meta = {
    title: 'React PDF',
    component: 기본_Canvas,
}
export default meta

const PDF_URL =
    'https://s3.ap-northeast-2.amazonaws.com/shinhwa-good-info/idbins/%EB%AC%B4%EB%B0%B0%EB%8B%B9%ED%94%84%EB%A1%9C%EB%AF%B8%EB%9D%BC%EC%9D%B4%ED%94%84%EC%B0%B8%EC%A2%8B%EC%9D%80%EC%9A%B4%EC%A0%84%EC%9E%90%EC%83%81%ED%95%B4%EB%B3%B4%ED%97%982210___2022-10-01___%EC%95%BD%EA%B4%80.pdf'

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
