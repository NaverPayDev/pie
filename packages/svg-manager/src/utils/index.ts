import getSecureMathRandom from './getSecureMathRandom'

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

export function generateRandomString<T>(...prefixes: T[]) {
    const MAX_RADIX = 36
    const DECIMAL_POINT_IDX = 2
    const randomString = getSecureMathRandom().toString(MAX_RADIX).slice(DECIMAL_POINT_IDX)

    return [...prefixes, randomString].join('_')
}
