import {PropsWithChildren, createContext, useContext, useMemo} from 'react'

import type {PDFDocumentProxy} from '../pdfjs-dist/types/pdfjs'

export interface PDFProviderContext {
    pdf: PDFDocumentProxy
    renderMode?: 'canvas' | 'svg'
}

const Context = createContext<PDFProviderContext | undefined>(undefined)

export function PDFProvider({pdf, renderMode = 'canvas', children}: PropsWithChildren<PDFProviderContext>) {
    const value = useMemo(() => ({pdf, renderMode}), [pdf, renderMode])

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export function usePdfContext() {
    const context = useContext(Context)

    if (context === undefined) {
        throw new Error('usePdfContext must be within PDFProvider')
    }

    return context
}
