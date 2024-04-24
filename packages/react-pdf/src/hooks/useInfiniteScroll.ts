import {useEffect, useCallback, useMemo, useRef} from 'react'

export default function useInfiniteScroll(onIntersect: () => void, options?: IntersectionObserverInit) {
    const ref = useRef<HTMLDivElement | null>(null)

    const handleIntersect = useCallback(
        ([entry]: IntersectionObserverEntry[]) => {
            if (entry.isIntersecting) {
                onIntersect()
            }
        },
        [onIntersect],
    )

    const observer = useMemo(() => {
        return new IntersectionObserver(handleIntersect, options)
    }, [handleIntersect, options])

    useEffect(() => {
        if (ref.current) {
            observer.observe(ref.current)
        }
        return () => {
            observer.disconnect()
        }
    }, [ref, observer])

    return ref
}
