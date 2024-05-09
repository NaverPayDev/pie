import React from 'react'

import {PDFViewer} from '../dist/cjs'

import '../dist/cjs/index.css'

const meta = {
    title: 'React PDF',
    component: 기본_PdfViewer,
}
export default meta

const PDF_URL = 'https://financial.pstatic.net/static/terms-policy/npay-usage/230906.pdf'

export function 기본_PdfViewer() {
    return (
        <PDFViewer
            pdfUrl={PDF_URL}
            renderMode="canvas"
            options={{
                externalLinkTarget: '_blank',
                cMapUrl: 'https://stage-financial-pstatic.fe.naver.com/pie/react-pdf/cmaps/',
                cMapCompressed: true,
            }}
        />
    )
}
