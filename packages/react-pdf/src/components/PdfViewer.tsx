import {ReactNode, useState} from 'react'

import {PDFProvider} from '../contexts/pdf'
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect'
import {PDFDocumentProxy} from '../pdfjs-dist/types/pdfjs'
import {getPdfDocument} from '../utils/pdf'
import {Pages, PagesProps} from './Pages'

export type PDFViewerProps = PagesProps & {
    pdfUrl: string
    header?: ReactNode
    footer?: ReactNode
    tokenize?: boolean
    onClickWords?: {target: string | RegExp; callback: () => void | Promise<void>}[]
    onLoadPDFRender?: () => void
    onErrorPDFRender?: (e: Error) => void
    options?: {
        cMapUrl?: string
        cMapCompressed?: boolean
        lazyLoading?: boolean
        withCredentials?: boolean
        externalLinkTarget?: '_self' | '_blank' | '_parent' | '_top'
    }
}

export function PDFViewer({pdfUrl, renderMode = 'canvas', header, footer, options}: PDFViewerProps) {
    const [pdf, setPdf] = useState<PDFDocumentProxy | undefined>()

    useIsomorphicLayoutEffect(() => {
        async function init() {
            const pdfDocument = await getPdfDocument({
                file: pdfUrl,
                /**
                 * 오래된 파일의 경우 cmap을 custom하게 지원
                 */
                ...(options?.cMapUrl ? {cMapUrl: options.cMapUrl} : {}),
                ...(options?.cMapCompressed ? {cMapPacked: options.cMapCompressed} : {}),
                /**
                 * header 설정
                 */
                ...(options?.withCredentials ? {withCredentials: options.withCredentials} : {}),
            })
            if (!pdf || pdf.fingerprint !== pdfDocument.fingerprint) {
                setPdf(pdfDocument)
            }
        }
        init()
    }, [options?.cMapCompressed, options?.cMapUrl, options?.withCredentials, pdf, pdfUrl])

    if (!pdf) {
        return null
    }

    return (
        <PDFProvider pdf={pdf} options={options}>
            {header}
            <Pages renderMode={renderMode} />
            {footer}
        </PDFProvider>
    )
}
