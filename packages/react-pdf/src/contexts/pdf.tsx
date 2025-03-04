import {createContext, useContext, useMemo} from 'react'

import type {ExternalLinkTarget} from '../utils/link-service'
import type {PDFDocumentProxy} from 'pdfjs-dist'
import type {PropsWithChildren} from 'react'

export interface PdfProviderContext {
    pdf: PDFDocumentProxy
    /**
     * pdf 렌더링 시 필요한 props
     */
    width?: number
    lazyLoading?: boolean
    tokenize?: boolean
    externalLinkTarget?: ExternalLinkTarget
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
