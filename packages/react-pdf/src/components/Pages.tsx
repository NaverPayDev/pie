import {PropsWithChildren, memo, useState} from 'react'

import {usePdfContext} from '../contexts/pdf'
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect'
import {PDFPageProxy} from '../pdfjs-dist/types/pdfjs'
import {AnnotationLayer} from './layer/Annotation'
import {TextLayer} from './layer/Text'
import {PageCanvas} from './page/Canvas'
import {PageSvg} from './page/Svg'

export interface PagesProps {
    renderMode?: 'canvas' | 'svg'
}

export const Page = memo(function Page({renderMode, pageNumber}: PagesProps & {pageNumber: number}) {
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
            <TextLayer page={page} />
            <AnnotationLayer page={page} />
        </div>
    )
})

export const Pages = memo(function Pages({renderMode, children}: PropsWithChildren<PagesProps>) {
    const {pdf} = usePdfContext()

    // TODO : 무한 스크롤

    return (
        <>
            {Array.from({length: pdf.numPages}).map((_, index) => {
                return <Page key={index} renderMode={renderMode} pageNumber={index + 1} />
            })}
            {children}
        </>
    )
})
