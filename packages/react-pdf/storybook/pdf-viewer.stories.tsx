import React from 'react'

import {PDFViewer} from '../dist/cjs'

import '../dist/cjs/index.css'

const meta = {
    title: 'React PDF',
    component: 기본_PdfViewer,
}
export default meta

const PDF_URL =
    'https://fs.pstatic.net/contents/resource/loan/personal-compare/required/0/1668583261818/gi_creditLoanNF_02.pdf'

export function 기본_PdfViewer() {
    return <PDFViewer pdfUrl={PDF_URL} />
}
