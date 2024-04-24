import React from 'react'

import {PDFViewer} from '../dist/cjs'

import '../dist/cjs/index.css'

const meta = {
    title: 'React PDF',
    component: 기본_PdfViewer,
}
export default meta

const PDF_URL = 'https://financial.pstatic.net/static/terms-policy/npay-usage/231025.pdf'

export function 기본_PdfViewer() {
    return <PDFViewer pdfUrl={PDF_URL} />
}
