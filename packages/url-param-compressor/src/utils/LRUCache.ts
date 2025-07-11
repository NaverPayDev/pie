export default class LRUCache<T> {
    private capacity: number
    private cache: Map<string, T>

    constructor(capacity: number) {
        this.capacity = capacity
        this.cache = new Map()
    }

    get(key: string) {
        if (this.cache.has(key)) {
            const value = this.cache.get(key)!
            this.cache.delete(key)
            this.cache.set(key, value)
            return value
        }

        return undefined
    }

    put(key: string, value: T) {
        if (this.cache.has(key)) {
            this.cache.delete(key)
        } else if (this.cache.size >= this.capacity) {
            this.cache.delete(Array.from(this.cache.keys())[0])
        }
        this.cache.set(key, value)
    }
}
