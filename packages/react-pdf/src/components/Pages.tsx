import {Fragment, PropsWithChildren, memo, useCallback} from 'react'

import {usePdfContext} from '../contexts/pdf'
import {PageCanvas} from './page/Canvas'
import {PageSvg} from './page/Svg'

export interface PagesProps {
    renderMode?: 'canvas' | 'svg'
}

export const Pages = memo(function Pages({renderMode, children}: PropsWithChildren<PagesProps>) {
    const {pdf} = usePdfContext()

    const RenderPDF = useCallback(() => {
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

    const RenderTextLayer = useCallback(() => {
        return null
    }, [])

    const RenderAnnotationLayer = useCallback(() => {
        return null
    }, [])

    return (
        <>
            <RenderPDF />
            <RenderTextLayer />
            <RenderAnnotationLayer />
            {children}
        </>
    )
})
