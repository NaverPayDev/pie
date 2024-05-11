import {ReactNode, memo, useCallback, useMemo, useState} from 'react'

import classNames from 'classnames/bind'

import {PdfPageProvider} from '../contexts/page'
import {usePdfContext} from '../contexts/pdf'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect'
import {PDFPageProxy} from '../pdfjs-dist/types/pdfjs'
import {AnnotationLayer} from './layer/Annotation'
import {TextLayer} from './layer/Text'
import {PageCanvas} from './page/Canvas'
import {PageSvg} from './page/Svg'
import styles from './PDFViewer.module.scss'

const cx = classNames.bind(styles)

export const Page = memo(function Page({pageNumber}: {pageNumber: number}) {
    const {pdf, renderMode} = usePdfContext()
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
        <PdfPageProvider page={page}>
            <div className={cx('document')} style={{position: 'relative'}} data-page-number={pageNumber}>
                {renderMode === 'canvas' && <PageCanvas />}
                {renderMode === 'svg' && <PageSvg />}
                <TextLayer />
                <AnnotationLayer />
            </div>
        </PdfPageProvider>
    )
})

export const Pages = memo(function Pages({children}: {children?: ReactNode}) {
    const {pdf, lazyLoading} = usePdfContext()
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
                        <Page pageNumber={pageNumber} />
                    </div>
                )
            })}
            {children}
        </>
    )
})
