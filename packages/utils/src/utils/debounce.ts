interface DebounceOptions {
    leading?: boolean // 첫 번째 호출을 즉시 실행할지 여부
    maxWait?: number // 최대 대기 시간
    trailing?: boolean // 마지막 호출을 실행할지 여부
}

export default function debounce<Args extends unknown[]>(
    func: (...args: Args) => unknown,
    waitMilliseconds = 0,
    {leading = false, trailing = true, maxWait}: DebounceOptions = {},
) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let lastArgs: Args | null = null
    let lastThis: unknown
    let result: unknown
    let lastCallTime: number | null = null
    let lastInvokeTime = 0

    const invokeFunc = (time: number) => {
        lastInvokeTime = time
        result = func.apply(lastThis, lastArgs as Args)
        lastThis = lastArgs = null
        return result
    }

    const startTimer = (pendingFunc: () => void, wait: number) => {
        return setTimeout(pendingFunc, wait)
    }

    const remainingWait = (time: number) => {
        const timeSinceLastCall = time - (lastCallTime as number)
        const timeSinceLastInvoke = time - lastInvokeTime
        const timeWaiting = waitMilliseconds - timeSinceLastCall
        return maxWait === undefined ? timeWaiting : Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
    }

    const shouldInvoke = (time: number) => {
        if (lastCallTime === null) {
            return true
        }
        const timeSinceLastCall = time - lastCallTime
        const timeSinceLastInvoke = time - lastInvokeTime

        return (
            lastCallTime === null ||
            timeSinceLastCall >= waitMilliseconds ||
            timeSinceLastCall < 0 ||
            (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
        )
    }

    const trailingEdge = (time: number) => {
        timeoutId = null
        if (trailing && lastArgs) {
            return invokeFunc(time)
        }
        lastArgs = lastThis = null
        return result
    }

    const timerExpired = () => {
        const time = Date.now()
        if (shouldInvoke(time)) {
            return trailingEdge(time)
        }
        timeoutId = startTimer(timerExpired, remainingWait(time))
    }

    const leadingEdge = (time: number) => {
        lastInvokeTime = time
        timeoutId = startTimer(timerExpired, waitMilliseconds)
        return leading ? invokeFunc(time) : result
    }

    const debounced = function (this: unknown, ...args: Args) {
        const time = Date.now()
        const isInvoking = shouldInvoke(time)

        lastArgs = args
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        lastThis = this
        lastCallTime = time

        if (isInvoking) {
            if (timeoutId === null) {
                return leadingEdge(lastCallTime)
            }
            if (maxWait !== undefined) {
                timeoutId = startTimer(timerExpired, remainingWait(time))
                return invokeFunc(lastCallTime)
            }
        }
        if (timeoutId === null) {
            timeoutId = startTimer(timerExpired, remainingWait(time))
        }
        return result
    }

    const cancel = () => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }
        lastInvokeTime = 0
        lastArgs = lastCallTime = lastThis = timeoutId = null
    }

    const flush = () => {
        return timeoutId === null ? result : trailingEdge(Date.now())
    }

    return {
        debounce: debounced,
        cancel,
        flush,
    }
}
