import {Fragment, memo, useCallback} from 'react'

import {usePdfContext} from '../contexts/pdf'
import {PageCanvas} from './page/Canvas'
import {PageSvg} from './page/Svg'

export interface PagesProps {
    renderMode?: 'canvas' | 'svg'
}

export const Pages = memo(function Pages({renderMode}: PagesProps) {
    const {pdf} = usePdfContext()

    const renderPdf = useCallback(() => {
        return Array.from({length: pdf.numPages}).map((_, index) => {
            const pageNumber = index + 1
            return (
                <Fragment key={index}>
                    {renderMode === 'canvas' && <PageCanvas pageNumber={pageNumber} />}
                    {renderMode === 'svg' && <PageSvg pageNumber={pageNumber} />}
                </Fragment>
            )
        })
    }, [pdf.numPages, renderMode])

    const renderTextLayer = useCallback(() => {}, [])

    const renderAnnotationLayer = useCallback(() => {}, [])

    return (
        <>
            {renderPdf()}
            {renderTextLayer()}
            {renderAnnotationLayer()}
        </>
    )
})
