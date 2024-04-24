import {memo, useState} from 'react'

import {useIsomorphicLayoutEffect} from '../../hooks/useIsomorphicLayoutEffect'
import {TextContent} from '../../pdfjs-dist/types/pdfjs'

import type {PDFPageProxy} from '../../pdfjs-dist/types/pdfjs'

interface TextLayerProps {
    page: PDFPageProxy
}

// })

export const TextLayer = memo(function TextLayer({page}: TextLayerProps) {
    const [texts, setTexts] = useState<TextContent | undefined>()

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

    return <div></div>
})
