import {useEffect, useMemo, useState} from 'react'

import {debounce} from '../utils/debounce'

import type {RefObject} from 'react'

const MAX_PAGE_WIDTH = 568
const PADDING_WIDTH = 14

const calculatedPageWidth = (windowWidth: number | undefined) => {
    if (!windowWidth) {
        return windowWidth
    }
    const adjustedWidth = windowWidth - PADDING_WIDTH

    return Math.min(adjustedWidth, MAX_PAGE_WIDTH)
}

const usePdfViewerPageWidth = (refElement: RefObject<HTMLDivElement>) => {
    const [windowWidth, setWindowWidth] = useState<number>()

    const getClientWidth = debounce(() => {
        const clientWidth = () => refElement?.current?.clientWidth || window.innerWidth || 0
        setWindowWidth(clientWidth())
    }, 100)

    useEffect(() => {
        window.addEventListener('resize', getClientWidth)
        return () => {
            window.removeEventListener('resize', getClientWidth)
        }
    }, [getClientWidth, refElement, setWindowWidth])

    return useMemo(
        () => ({
            getClientWidth,
            width: calculatedPageWidth(windowWidth),
        }),
        [getClientWidth, windowWidth],
    )
}

export default usePdfViewerPageWidth
