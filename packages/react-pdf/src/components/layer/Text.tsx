import {memo, useCallback, useMemo, useState} from 'react'

import classNames from 'classnames/bind'

import {useIsomorphicLayoutEffect} from '../../hooks/useIsomorphicLayoutEffect'
import styles from './Text.module.scss'

import type {TextContent, PDFPageProxy, TextContentItem} from '../../pdfjs-dist/types/pdfjs'

const cx = classNames.bind(styles)

export const TextLayerItem = memo(function TextLayerItem({
    textItem: {str: text, transform, fontName, width},
    page,
}: {
    textItem: TextContentItem

    page: PDFPageProxy
}) {
    const {rotation, viewBox} = page.getViewport({scale: 1})

    const drawTextLayerItem = useCallback(
        async (element: HTMLSpanElement | null) => {
            if (!element) {
                return
            }

            const fontData = (await new Promise((resolve) => {
                page.commonObjs.get(fontName, resolve)
            })) as {fallbackName: string; ascent: number} | undefined
            const fallbackFontName = fontData?.fallbackName || 'sans-serif'
            element.style.fontFamily = `${fontName}, ${fallbackFontName}`

            const defaultSideways = rotation % 180 !== 0
            const targetWidth = width
            const actualWidth = element.getBoundingClientRect()[defaultSideways ? 'height' : 'width']
            let elementTransform = `scaleX(${targetWidth / actualWidth})`
            const ascent = fontData?.ascent || 0
            if (ascent) {
                elementTransform += ` translateY(${(1 - ascent) * 100}%)`
            }

            element.style.transform = elementTransform
            element.style.webkitTransform = elementTransform
        },
        [fontName, page.commonObjs, rotation, width],
    )

    const style = useMemo(() => {
        const defaultSideways = rotation % 180 !== 0
        const [fontHeightPx, fontWidthPx, offsetX, offsetY, x, y] = transform
        const [xMin, yMin, _, yMax] = viewBox
        return {
            fontSize: defaultSideways ? fontWidthPx : fontHeightPx,
            top: defaultSideways ? x + offsetX + yMin : yMax - (y + offsetY),
            left: defaultSideways ? y - xMin : x - xMin,
        }
    }, [rotation, transform, viewBox])

    return (
        <span ref={drawTextLayerItem} className={cx('text-layer-item')} style={style}>
            {text}
        </span>
    )
})

interface TextLayerProps {
    page: PDFPageProxy
}

export const TextLayer = memo(function TextLayer({page}: TextLayerProps) {
    const [texts, setTexts] = useState<TextContent | undefined>()
    const viewport = page.getViewport({scale: 1})

    useIsomorphicLayoutEffect(() => {
        async function init() {
            const textContent = await page.getTextContent()
            // TODO: chunking
            setTexts(textContent)
        }
        init()
    }, [page])

    if (!texts) {
        return null
    }

    return (
        <div className={cx('text-layer')} style={{width: `${viewport.width}px`, height: `${viewport.height}px`}}>
            {texts.items.map((text, index) => (
                <TextLayerItem key={index} textItem={text} page={page} />
            ))}
        </div>
    )
})
