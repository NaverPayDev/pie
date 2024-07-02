interface ThrottleOptions {
    leading?: boolean // 첫 번째 호출을 즉시 실행할지 여부
    maxWait?: number // 최대 대기 시간
    trailing?: boolean // 마지막 호출을 실행할지 여부
}

const throttle = <Return, Arguments extends unknown[]>(
    func: (...args: Arguments) => Return,
    wait = 0,
    {leading = true, trailing = true, maxWait}: ThrottleOptions = {},
): {throttled: (...args: Arguments) => Return | undefined; cancel: () => void} => {
    let timer: NodeJS.Timeout | null = null
    let lastArgs: Arguments | null = null
    let result: Return | undefined
    let lastInvokeTime = 0
    let canceled = false
    let maxWaitTimer: NodeJS.Timeout | null = null

    const invokeFunc = (args: Arguments) => {
        lastInvokeTime = Date.now()
        result = func(...args)
        lastArgs = null
    }

    const leadingEdge = (args: Arguments) => {
        invokeFunc(args)
    }

    const trailingEdge = () => {
        if (trailing && lastArgs) {
            invokeFunc(lastArgs)
        }
        timer = null
        if (maxWaitTimer) {
            clearTimeout(maxWaitTimer)
            maxWaitTimer = null
        }
    }

    const throttled = (...args: Arguments): Return | undefined => {
        if (canceled) {
            return undefined
        }

        const now = Date.now()
        const timeSinceLastInvoke = now - lastInvokeTime

        if (!timer) {
            if (leading && timeSinceLastInvoke >= wait) {
                leadingEdge(args)
            } else if (trailing) {
                lastArgs = args
            }

            timer = setTimeout(() => {
                trailingEdge()
            }, wait)

            if (maxWait && !maxWaitTimer) {
                maxWaitTimer = setTimeout(() => {
                    if (trailing && lastArgs) {
                        invokeFunc(lastArgs)
                    }
                    clearTimeout(timer!)
                    timer = null
                    maxWaitTimer = null
                }, maxWait)
            }
        } else if (trailing) {
            lastArgs = args
        }

        return result
    }

    const cancel = () => {
        canceled = true
        if (timer) {
            clearTimeout(timer)
        }
        if (maxWaitTimer) {
            clearTimeout(maxWaitTimer)
        }
        timer = null
        maxWaitTimer = null
        lastArgs = null
    }

    return {throttled, cancel}
}

export default throttle
