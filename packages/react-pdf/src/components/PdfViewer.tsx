import {MouseEventHandler, ReactNode, useCallback, useEffect, useRef, useState} from 'react'

import classNames from 'classnames/bind'

import {PdfProvider, PdfProviderContext} from '../contexts/pdf'
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect'
import usePdfViewerPageWidth from '../hooks/usePdfViewerPageWidth'
import {PDFDocumentProxy} from '../pdfjs-dist/types/pdfjs'
import {getPdfDocument} from '../utils/pdf'
import {Pages} from './Pages'
import styles from './PDFViewer.module.scss'

const cx = classNames.bind(styles)

type PdfRenderProps = Omit<PdfProviderContext, 'pdf'>

export type PDFViewerProps = PdfRenderProps & {
    /**
     * pdf load 시 필요한 props
     */
    pdfUrl: string
    cMapUrl?: string
    cMapCompressed?: boolean
    withCredentials?: boolean
    /**
     * pdf viewer custom props
     */
    onClickWords?: {target: string | RegExp; callback: () => void | Promise<void>}[]
    /**
     * pdf load 및 rendering 관련 callback
     */
    onLoadPDFRender?: () => void
    onErrorPDFRender?: (e: Error) => void
    /**
     * pdf 외 rendering 할 컴포넌트
     */
    header?: ReactNode
    footer?: ReactNode
}

export function PDFViewer({
    pdfUrl,
    tokenize: injectedTokenize,
    onClickWords,
    header,
    footer,
    lazyLoading = true,
    ...options
}: PDFViewerProps) {
    const [pdf, setPdf] = useState<PDFDocumentProxy | undefined>()
    const ref = useRef<HTMLDivElement>(null)
    const {width, getClientWidth} = usePdfViewerPageWidth(ref)

    useIsomorphicLayoutEffect(() => {
        async function init() {
            const pdfDocument = await getPdfDocument({
                file: pdfUrl,
                /**
                 * 오래된 파일의 경우 cmap을 custom하게 지원
                 */
                ...(options?.cMapUrl ? {cMapUrl: options.cMapUrl} : {}),
                ...(options?.cMapCompressed ? {cMapPacked: options.cMapCompressed} : {}),
                /**
                 * header 설정
                 */
                ...(options?.withCredentials ? {withCredentials: options.withCredentials} : {}),
            })
            if (!pdf || pdf.fingerprint !== pdfDocument.fingerprint) {
                setPdf(pdfDocument)
            }
        }
        init()
    }, [options?.cMapCompressed, options?.cMapUrl, options?.withCredentials, pdf, pdfUrl])

    useEffect(() => {
        if (width) {
            return
        }
        getClientWidth()
    }, [width, getClientWidth])

    const handleClickWords: MouseEventHandler<HTMLDivElement | HTMLSpanElement> = useCallback(
        async (e) => {
            if (!onClickWords) {
                return
            }
            const element = e.target as HTMLElement
            const clickedText = (element?.innerText || '').trim()
            const isSpanTag = element.tagName === 'SPAN'
            if (!clickedText || !isSpanTag) {
                return
            }
            for await (const {target, callback} of onClickWords) {
                let result = false
                if (typeof target === 'string') {
                    result = target === clickedText
                }
                if (target instanceof RegExp) {
                    result = target.test(clickedText)
                }
                if (result) {
                    await callback()
                    return
                }
            }
        },
        [onClickWords],
    )

    if (!pdf || !width) {
        return null
    }

    return (
        <PdfProvider
            pdf={pdf}
            width={width}
            lazyLoading={lazyLoading}
            tokenize={injectedTokenize ?? (onClickWords || []).length > 0}
            {...options}
        >
            <div ref={ref} className={cx('article')} onClick={handleClickWords}>
                {header}
                <Pages />
                {footer}
            </div>
        </PdfProvider>
    )
}
