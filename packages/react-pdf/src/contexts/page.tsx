import {PropsWithChildren, createContext, useContext, useMemo} from 'react'

import type {PDFPageProxy} from '../pdfjs-dist/types/pdfjs'

export interface PdfPageContext {
    page: PDFPageProxy
    scale: number
}

const Context = createContext<PdfPageContext | undefined>(undefined)

export function PdfPageProvider({page, children}: PropsWithChildren<{page: PDFPageProxy}>) {
    const value = useMemo(() => {
        return {
            page,
            scale: 1,
        }
    }, [page])

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export function usePdfPageContext() {
    const context = useContext(Context)

    if (context === undefined) {
        throw new Error('usePdfPageContext must be within PdfPageProvider')
    }

    return context
}
