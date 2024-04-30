import {PropsWithChildren, memo, useCallback, useMemo, useState} from 'react'

import {usePdfContext} from '../contexts/pdf'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect'
import {PDFPageProxy} from '../pdfjs-dist/types/pdfjs'
import {AnnotationLayer} from './layer/Annotation'
import {TextLayer} from './layer/Text'
import {PageCanvas} from './page/Canvas'
import {PageSvg} from './page/Svg'

export interface PagesProps {
    renderMode?: 'canvas' | 'svg'
    lazyLoading?: boolean
    tokenize?: boolean
}

export const Page = memo(function Page({
    renderMode,
    tokenize,
    pageNumber,
}: Omit<PagesProps, 'lazyLoading'> & {pageNumber: number}) {
    const {pdf} = usePdfContext()
    const [page, setPage] = useState<PDFPageProxy | undefined>()

    useIsomorphicLayoutEffect(() => {
        async function init() {
            const newPage = await pdf.getPage(pageNumber)
            setPage(newPage)
        }
        init()
    }, [])

    if (!page) {
        return null
    }

    return (
        <div style={{position: 'relative'}} data-page-number={pageNumber}>
            {renderMode === 'canvas' && <PageCanvas page={page} />}
            {renderMode === 'svg' && <PageSvg page={page} />}
            <TextLayer page={page} tokenize={tokenize} />
            <AnnotationLayer page={page} />
        </div>
    )
})

export const Pages = memo(function Pages({renderMode, lazyLoading, tokenize, children}: PropsWithChildren<PagesProps>) {
    const {pdf} = usePdfContext()
    const pageNumbers = useMemo(() => Array.from({length: pdf.numPages}, (_, index) => index + 1), [pdf.numPages])
    const [renderPages, setRenderPages] = useState<number[]>(pdf.numPages > 0 ? [1] : [])

    const handleIntersect = useCallback(() => {
        setRenderPages((prev) => {
            if (prev.length < pageNumbers.length) {
                return [...prev, prev.length + 1]
            }
            return prev
        })
    }, [pageNumbers])

    const ref = useInfiniteScroll(handleIntersect, {threshold: 0.5})

    return (
        <>
            {(lazyLoading ? renderPages : pageNumbers).map((pageNumber) => {
                return (
                    <div key={pageNumber} ref={lazyLoading && renderPages.length === pageNumber ? ref : null}>
                        <Page renderMode={renderMode} pageNumber={pageNumber} tokenize={tokenize} />
                    </div>
                )
            })}
            {children}
        </>
    )
})
