import createDOMPurify from 'dompurify'
import {JSDOM} from 'jsdom'

export interface Options {
    /**
     * Interval for recreating the DOMPurify instance to prevent memory leaks
     * Default is 1000 sanitization calls
     */
    recreateInterval?: number
    /**
     * Enable caching of sanitized results to improve performance
     * Default is true
     */
    enableCache?: boolean
    /**
     * Maximum size of the cache
     * Default is 100 entries
     */
    maxCacheSize?: number
}

export type DomPurify = ReturnType<typeof createDOMPurify>

type SanitizeParams = Parameters<DomPurify['sanitize']>
export type DirtyHtml = SanitizeParams[0]
export type SanitizeConfig = SanitizeParams[1]

class OptimizedDOMPurify {
    recreateInterval: number
    jsdom: JSDOM | null
    purify: ReturnType<typeof createDOMPurify> | null
    callCount: number
    enableCache: boolean
    cache: Map<string | Node, string> | null
    maxCacheSize: number
    constructor(
        options: Options = {
            enableCache: true,
        },
    ) {
        this.recreateInterval = options?.recreateInterval || 1000
        this.enableCache = !!options?.enableCache
        this.cache = this.enableCache ? new Map() : null
        this.maxCacheSize = options?.maxCacheSize || 100

        this.jsdom = null
        this.purify = null
        this.callCount = 0

        this.initialize()
    }

    initialize() {
        // Cleanup previous instance
        if (this.jsdom?.window) {
            try {
                const doc = this.jsdom.window.document
                if (doc.body) {
                    doc.body.innerHTML = ''
                }
                if (doc.head) {
                    doc.head.innerHTML = ''
                }
                while (doc.firstChild) {
                    doc.removeChild(doc.firstChild)
                }
            } catch {
                // ignore cleanup errors
            }
            this.jsdom.window.close()
        }

        this.purify = null
        this.jsdom = null

        if (global.gc && typeof global.gc === 'function') {
            global.gc()
        }

        this.jsdom = new JSDOM('<!DOCTYPE html>')
        this.purify = createDOMPurify(this.jsdom.window)
        this.callCount = 0

        if (this.cache) {
            this.cache.clear()
        }
    }

    sanitize(dirty: DirtyHtml, config?: SanitizeConfig) {
        if (this.enableCache && !config && this.cache) {
            if (this.cache.has(dirty)) {
                return this.cache.get(dirty)
            }
        }

        const cleanHtml = this.purify?.sanitize(dirty, config)

        if (this.enableCache && !config && this.cache) {
            if (this.cache.size >= this.maxCacheSize) {
                const firstKey = this.cache.keys().next().value
                firstKey && this.cache.delete(firstKey)
            }
            cleanHtml && this.cache.set(dirty, cleanHtml)
        }

        this.callCount++
        if (this.callCount >= this.recreateInterval) {
            this.initialize()
        }

        return cleanHtml
    }

    cleanup() {
        if (this.jsdom?.window) {
            this.jsdom.window.close()
        }
        if (this.cache) {
            this.cache.clear()
        }
        this.jsdom = null
        this.purify = null
    }
}

let instance: OptimizedDOMPurify | null = null

function getSanitizer(options?: Options) {
    if (!instance) {
        instance = new OptimizedDOMPurify(options)
    }
    return instance
}

export function sanitizeHtml(dirty: DirtyHtml, config?: SanitizeConfig) {
    const isClientSide = typeof window !== 'undefined'
    const sanitizer = isClientSide ? createDOMPurify : getSanitizer()
    return sanitizer.sanitize(dirty, config)
}
