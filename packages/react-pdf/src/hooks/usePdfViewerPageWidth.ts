import {useEffect, useMemo, useState} from 'react'

import {debounce} from '../utils/debounce'

import type {RefObject} from 'react'

export const DEFAULT_MAX_PAGE_WIDTH = 568
const PADDING_WIDTH = 14

const calculatedPageWidth = (windowWidth: number | undefined, maxPageWidth: number) => {
    if (!windowWidth) {
        return windowWidth
    }
    const adjustedWidth = windowWidth - PADDING_WIDTH

    return Math.min(adjustedWidth, maxPageWidth)
}

const usePdfViewerPageWidth = (
    refElement: RefObject<HTMLDivElement>,
    maxPageWidth: number = DEFAULT_MAX_PAGE_WIDTH,
) => {
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
            width: calculatedPageWidth(windowWidth, maxPageWidth),
        }),
        [getClientWidth, windowWidth, maxPageWidth],
    )
}

export default usePdfViewerPageWidth
