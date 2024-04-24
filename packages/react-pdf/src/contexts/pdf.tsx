import {PropsWithChildren, createContext, useContext, useMemo} from 'react'

import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {PDFLinkService} from '../pdfjs-dist/lib/web/pdf_link_service'

import type {PDFDocumentProxy} from '../pdfjs-dist/types/pdfjs'

export interface PDFProviderContext {
    pdf: PDFDocumentProxy
    linkService: PDFLinkService
}

const Context = createContext<PDFProviderContext | undefined>(undefined)

const linkService = new PDFLinkService()

export function PDFProvider({
    pdf,
    externalLinkTarget,
    children,
}: PropsWithChildren<{pdf: PDFDocumentProxy; externalLinkTarget?: '_self' | '_blank' | '_parent' | '_top'}>) {
    useIsomorphicLayoutEffect(() => {
        Object.defineProperty(linkService, 'externalLinkTarget', {
            get() {
                switch (externalLinkTarget) {
                    case '_self':
                        return 1
                    case '_blank':
                        return 2
                    case '_parent':
                        return 3
                    case '_top':
                        return 4
                    default:
                        return 0
                }
            },
        })
    }, [])

    const value = useMemo(() => ({pdf, linkService}), [pdf])

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export function usePdfContext() {
    const context = useContext(Context)

    if (context === undefined) {
        throw new Error('usePdfContext must be within PDFProvider')
    }

    return context
}
