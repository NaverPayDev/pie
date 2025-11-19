import createDOMPurify from 'dompurify'

import type {Window as HappyDOMWindow} from 'happy-dom'
import type {JSDOM, DOMWindow as JSDOMWindow} from 'jsdom'
import type {parseHTML} from 'linkedom'

/**
 * DOM Window types from supported libraries
 * - jsdom: JSDOM Window
 * - happy-dom: Window
 * - linkedom: parseHTML result
 *
 * @example
 * import { JSDOM } from 'jsdom'
 * const jsdomWindow: DOMWindow = new JSDOM('<!DOCTYPE html>')
 *
 * @example
 * import { Window } from 'happy-dom'
 * const happyDomWindow: DOMWindow = new Window()
 *
 * @example
 * import { parseHTML } from 'linkedom'
 * const linkedomWindow: DOMWindow = parseHTML('<!DOCTYPE html>')
 */
export type DOMWindow = JSDOMWindow | HappyDOMWindow | ReturnType<typeof parseHTML>

/**
 * DOM instance types that can be provided directly or via factory
 */
export type DOMInstance = JSDOM | HappyDOMWindow | ReturnType<typeof parseHTML>

/**
 * Factory function to create a DOM window instance, or the instance itself
 * - jsdom: JSDOM instance or factory returning JSDOM
 * - happy-dom: Window instance or factory returning Window
 * - linkedom: parseHTML result or factory returning parseHTML result
 *
 * @example
 * // Direct instance
 * domWindowFactory: new Window()
 *
 * @example
 * // Factory function
 * domWindowFactory: () => new Window()
 */
export type DOMWindowFactory = (() => DOMInstance) | DOMInstance

export interface SanitizerOptions {
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
    /**
     * Custom DOM window factory for server-side rendering
     * Supports jsdom, happy-dom, linkedom, or any compatible DOM implementation
     *
     * @example
     * // Using jsdom
     * import { JSDOM } from 'jsdom'
     * configureDOMPurify({ domWindowFactory: () => new JSDOM('<!DOCTYPE html>') })
     *
     * @example
     * // Using happy-dom
     * import { Window } from 'happy-dom'
     * configureDOMPurify({ domWindowFactory: () => new Window() })
     *
     * @example
     * // Using linkedom
     * import { parseHTML } from 'linkedom'
     * configureDOMPurify({ domWindowFactory: () => parseHTML('<!DOCTYPE html>') })
     */
    domWindowFactory?: DOMWindowFactory
}

export type DomPurify = ReturnType<typeof createDOMPurify>

type SanitizeParams = Parameters<DomPurify['sanitize']>
export type DirtyHtml = SanitizeParams[0]
export type SanitizeConfig = SanitizeParams[1]

class OptimizedDOMPurify {
    recreateInterval: number
    domInstance: {window: DOMWindow} | null
    domWindowFactory: DOMWindowFactory
    purify: ReturnType<typeof createDOMPurify> | null
    callCount: number
    enableCache: boolean
    cache: Map<string | Node, string> | null
    maxCacheSize: number

    constructor(options: SanitizerOptions = {}) {
        this.recreateInterval = options?.recreateInterval || 1000
        this.enableCache = options?.enableCache !== false // Default true
        this.cache = this.enableCache ? new Map() : null
        this.maxCacheSize = options?.maxCacheSize || 100

        if (!options?.domWindowFactory) {
            throw new Error(
                'No DOM implementation configured for server-side rendering.\n' +
                    'Please configure DOMPurify with one of the following:\n\n' +
                    '  import { configureDOMPurify } from "@naverpay/safe-html-react-parser"\n' +
                    '  import { JSDOM } from "jsdom"\n' +
                    '  configureDOMPurify({ domWindowFactory: () => new JSDOM("<!DOCTYPE html>") })\n\n' +
                    'Or use happy-dom for better performance:\n' +
                    '  import { Window } from "happy-dom"\n' +
                    '  configureDOMPurify({ domWindowFactory: () => new Window() })\n\n' +
                    'Or use linkedom for minimal footprint:\n' +
                    '  import { parseHTML } from "linkedom"\n' +
                    '  configureDOMPurify({ domWindowFactory: () => parseHTML("<!DOCTYPE html>") })',
            )
        }

        this.domWindowFactory = options.domWindowFactory

        this.domInstance = null
        this.purify = null
        this.callCount = 0

        this.initialize()
    }

    initialize() {
        // Cleanup previous instance
        if (this.domInstance?.window) {
            try {
                const doc = this.domInstance.window.document
                if (doc.body) {
                    doc.body.innerHTML = ''
                }
                if (doc.head) {
                    doc.head.innerHTML = ''
                }
                if (doc.documentElement) {
                    doc.documentElement.innerHTML = ''
                }
            } catch {
                // ignore cleanup errors
            }

            const win = this.domInstance.window as unknown as {close?: () => void}
            if (typeof win.close === 'function') {
                win.close()
            }
        }

        this.purify = null
        this.domInstance = null

        if (global.gc && typeof global.gc === 'function') {
            global.gc()
        }

        const result = typeof this.domWindowFactory === 'function' ? this.domWindowFactory() : this.domWindowFactory
        this.domInstance = 'window' in result ? (result as {window: DOMWindow}) : {window: result}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.purify = createDOMPurify(this.domInstance.window as any)
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
        if (this.domInstance?.window) {
            const win = this.domInstance.window as unknown as {close?: () => void}
            if (typeof win.close === 'function') {
                win.close()
            }
        }
        if (this.cache) {
            this.cache.clear()
        }
        this.domInstance = null
        this.purify = null
    }
}

let instance: OptimizedDOMPurify | null = null

function getSanitizer(options?: SanitizerOptions) {
    if (!instance) {
        instance = new OptimizedDOMPurify(options)
    }
    return instance
}

/**
 * Configure DOMPurify settings globally (optional)
 * Alternatively, you can pass options directly to sanitizeHtml
 *
 * @example
 * // Using jsdom
 * import { JSDOM } from 'jsdom'
 * configureDOMPurify({
 *   domWindowFactory: () => new JSDOM('<!DOCTYPE html>'),
 *   enableCache: true,
 *   maxCacheSize: 100
 * })
 *
 * @example
 * // Using happy-dom for better performance
 * import { Window } from 'happy-dom'
 * configureDOMPurify({
 *   domWindowFactory: () => new Window(),
 *   recreateInterval: 500
 * })
 */
export function configureDOMPurify(options: SanitizerOptions) {
    // Reset instance to apply new configuration
    if (instance) {
        instance.cleanup()
        instance = null
    }
    // Create new instance with provided options
    instance = new OptimizedDOMPurify(options)
}

/**
 * Sanitize HTML string using DOMPurify
 *
 * @param dirty - HTML string to sanitize
 * @param config - DOMPurify configuration
 * @param options - Server-side options (DOM implementation, caching, etc.)
 *
 * @example
 * // Client-side (automatic)
 * sanitizeHtml('<p>Hello <script>alert("XSS")</script></p>')
 *
 * @example
 * // Server-side with custom DOM
 * import { Window } from 'happy-dom'
 * sanitizeHtml('<p>Hello</p>', undefined, {
 *   domWindowFactory: () => new Window(),
 *   enableCache: true
 * })
 */
export function sanitizeHtml(dirty: DirtyHtml, config?: SanitizeConfig, options?: SanitizerOptions) {
    const isClientSide = typeof window !== 'undefined'
    const sanitizer = isClientSide ? createDOMPurify : getSanitizer(options)
    return sanitizer.sanitize(dirty, config)
}
