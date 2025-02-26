import {memo, useCallback, useMemo, useState} from 'react'

import classNames from 'classnames/bind'

import {usePdfPageContext} from '../../contexts/page'
import {usePdfContext} from '../../contexts/pdf'
import {useIsomorphicLayoutEffect} from '../../hooks/useIsomorphicLayoutEffect'
import {mergeTextItems} from '../../utils/text'
import styles from './Text.module.scss'

import type {TextItem} from 'pdfjs-dist/types/src/display/api'
import type {TextContent} from 'pdfjs-dist/types/src/display/text_layer'

const cx = classNames.bind(styles)

export const TextLayerItem = memo(function TextLayerItem({
    textItem: {str: text, transform, fontName, width},
}: {
    textItem: TextItem
}) {
    const {page, scale} = usePdfPageContext()
    const {rotation, viewBox} = page.getViewport({scale})

    const drawTextLayerItem = useCallback(
        async (element: HTMLSpanElement | null) => {
            requestAnimationFrame(async () => {
                if (!element) {
                    return
                }

                const fontData = (await new Promise((resolve) => {
                    page.commonObjs.get(fontName, resolve)
                })) as {fallbackName: string; ascent: number} | undefined
                const fallbackFontName = fontData?.fallbackName || 'sans-serif'
                element.style.fontFamily = `${fontName}, ${fallbackFontName}`

                const defaultSideways = rotation % 180 !== 0
                const targetWidth = width * scale
                const actualWidth = element.getBoundingClientRect()[defaultSideways ? 'height' : 'width']
                let elementTransform = `scaleX(${targetWidth / actualWidth})`
                const ascent = fontData?.ascent || 0
                if (ascent) {
                    elementTransform += ` translateY(${(1 - ascent) * 100}%)`
                }

                element.style.transform = elementTransform
                element.style.webkitTransform = elementTransform
            })
        },
        [fontName, page.commonObjs, rotation, scale, width],
    )

    const style = useMemo(() => {
        const defaultSideways = rotation % 180 !== 0
        const [fontHeightPx, fontWidthPx, offsetX, offsetY, x, y] = transform
        const [xMin, yMin, _, yMax] = viewBox
        const fontSize = defaultSideways ? fontWidthPx : fontHeightPx
        const top = defaultSideways ? x + offsetX + yMin : yMax - (y + offsetY)
        const left = defaultSideways ? y - xMin : x - xMin
        return {
            fontSize: fontSize * scale,
            top: top * scale,
            left: left * scale,
        }
    }, [rotation, scale, transform, viewBox])

    return (
        <span ref={drawTextLayerItem} className={cx('text-layer-item')} style={style}>
            {text}
        </span>
    )
})

export const TextLayer = memo(function TextLayer() {
    const {tokenize} = usePdfContext()
    const {page, viewport} = usePdfPageContext()
    const [texts, setTexts] = useState<TextContent | undefined>()

    useIsomorphicLayoutEffect(() => {
        async function init() {
            const {items, styles: textStyles} = await page.getTextContent()
            setTexts({items: mergeTextItems(items, {tokenize}), styles: textStyles, lang: null})
        }
        init()
    }, [page, tokenize])

    if (!texts) {
        return null
    }

    return (
        <div
            className={cx('text-layer')}
            style={{
                position: 'absolute',
                color: 'transparent',
                top: 0,
                left: 0,
                width: `${Math.floor(viewport.width)}px`,
                height: `${Math.floor(viewport.height)}px`,
            }}
        >
            {texts.items.map((text, index) => {
                if ('str' in text) {
                    return <TextLayerItem key={index} textItem={text} />
                }
                return null
            })}
        </div>
    )
})
