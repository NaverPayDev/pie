import {PdfViewer} from '../src/components/PdfViewer'

const meta = {
    title: 'React PDF',
    component: 기본_PdfViewer,
}
export default meta

const PDF_URL = 'https://financial.pstatic.net/static/terms-policy/npay-usage/230906.pdf'

export function 기본_PdfViewer() {
    return <PdfViewer pdfUrl={PDF_URL} externalLinkTarget="_blank" />
}
