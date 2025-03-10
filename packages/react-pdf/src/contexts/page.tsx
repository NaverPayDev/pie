import {createContext, useContext, useMemo} from 'react'

import {usePdfContext} from './pdf'

import type {PDFPageProxy} from 'pdfjs-dist'
import type {PageViewport} from 'pdfjs-dist/types/src/display/display_utils'
import type {PropsWithChildren} from 'react'

interface PdfPageProviderProps {
    page: PDFPageProxy
    width?: number
    height?: number
    rotate?: number
}

export type PdfPageContext = PdfPageProviderProps & {
    viewport: PageViewport
    scale: number
}

const Context = createContext<PdfPageContext | undefined>(undefined)

export function PdfPageProvider({page, width, height, children}: PropsWithChildren<PdfPageProviderProps>) {
    const {width: windowWidth} = usePdfContext()

    const value = useMemo(() => {
        const viewport = page.getViewport({scale: 1})
        const scale = width
            ? width / viewport.width
            : height
            ? height / viewport.height
            : windowWidth
            ? windowWidth / viewport.width
            : 1
        const viewportWithScale = page.getViewport({scale})
        return {page, viewport: viewportWithScale, scale}
    }, [height, page, width, windowWidth])

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export function usePdfPageContext() {
    const context = useContext(Context)

    if (context === undefined) {
        throw new Error('usePdfPageContext must be within PdfPageProvider')
    }

    return context
}
