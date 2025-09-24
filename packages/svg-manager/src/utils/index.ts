function createSingleton<T>(fn: () => T): () => T {
    const memoize = () => {
        const key = 'MEMOIZED_KEY'
        const cache = memoize.cache

        if (cache.has(key)) {
            return cache.get(key)
        }
        const result = fn()

        memoize.cache = cache.set(key, result) || cache

        return result
    }

    memoize.cache = new Map()

    return memoize
}

export function toSingleton<T>(fn: () => T): () => T {
    return createSingleton<T>(fn)
}
