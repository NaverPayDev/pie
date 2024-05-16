export function debounce<Args extends unknown[]>(callback: (...args: Args) => unknown, timeout = 700) {
    let timer: NodeJS.Timeout

    return (...args: Args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(...args)
        }, timeout)
    }
}
