import {PropsWithChildren, createContext, useContext, useMemo} from 'react'

import type {PDFDocumentProxy} from '../pdfjs-dist/types/pdfjs'

export interface PdfProviderContext {
    pdf: PDFDocumentProxy
    /**
     * pdf 렌더링 시 필요한 props
     */
    width?: number
    renderMode?: 'canvas' | 'svg' | null
    lazyLoading?: boolean
    tokenize?: boolean
    externalLinkTarget?: '_self' | '_blank' | '_parent' | '_top'
}

const Context = createContext<PdfProviderContext | undefined>(undefined)

export function PdfProvider({pdf, children, ...options}: PropsWithChildren<PdfProviderContext>) {
    const value = useMemo(() => ({pdf, ...options}), [options, pdf])
    return <Context.Provider value={value}>{children}</Context.Provider>
}

export function usePdfContext() {
    const context = useContext(Context)

    if (context === undefined) {
        throw new Error('usePdfContext must be within PdfProvider')
    }

    return context
}
