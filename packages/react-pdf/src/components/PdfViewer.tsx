import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import classNames from 'classnames/bind'

import {Pages} from './Pages'
import styles from './PdfViewer.module.scss'
import {PdfProvider} from '../contexts/pdf'
import {useIsomorphicLayoutEffect} from '../hooks/useIsomorphicLayoutEffect'
import usePdfViewerPageWidth from '../hooks/usePdfViewerPageWidth'
import {getPdfDocument} from '../utils/pdf'

import type {PdfProviderContext} from '../contexts/pdf'
import type {PDFDocumentProxy} from 'pdfjs-dist'
import type {CSSProperties, MouseEventHandler, ReactNode} from 'react'

const cx = classNames.bind(styles)

type PdfRenderProps = Omit<PdfProviderContext, 'pdf'>

export type PdfViewerProps = PdfRenderProps & {
    /**
     * pdf load 시 필요한 props
     */
    pdfUrl: string
    pdfWorkerSource?: string
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
    onErrorPDFRender?: (e: unknown) => void
    /**
     * pdf 외 rendering 할 컴포넌트
     */
    header?: ReactNode
    footer?: ReactNode
    /**
     * pdf viewer 최상단 div style
     */
    style?: CSSProperties
}

export function PdfViewer({
    pdfUrl,
    pdfWorkerSource,
    tokenize: injectedTokenize,
    onClickWords,
    header,
    footer,
    lazyLoading = true,
    externalLinkTarget = '_blank',
    onLoadPDFRender,
    onErrorPDFRender,
    style = {},
    ...options
}: PdfViewerProps) {
    const [pdf, setPdf] = useState<PDFDocumentProxy | undefined>()
    const ref = useRef<HTMLDivElement>(null)
    const {width, getClientWidth} = usePdfViewerPageWidth(ref)

    const loadPdfConfig = useMemo(
        () => ({
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
        }),
        [pdfUrl], // eslint-disable-line react-hooks/exhaustive-deps
    )

    useIsomorphicLayoutEffect(() => {
        async function init() {
            try {
                const pdfDocument = await getPdfDocument(loadPdfConfig)
                if (!pdf || pdf.fingerprints.toString() !== pdfDocument.fingerprints.toString()) {
                    setPdf(pdfDocument)
                }
                onLoadPDFRender?.()
            } catch (error) {
                onErrorPDFRender?.(error)
            }
        }
        init()
    }, [loadPdfConfig])

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
            externalLinkTarget={externalLinkTarget}
            tokenize={injectedTokenize ?? (onClickWords || []).length > 0}
            {...options}
        >
            <div ref={ref} style={style} className={cx('article')} onClick={handleClickWords}>
                {header}
                <Pages />
                {footer}
            </div>
        </PdfProvider>
    )
}
