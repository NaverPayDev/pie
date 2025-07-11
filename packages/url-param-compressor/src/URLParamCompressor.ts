import {deflateSync, inflateSync} from 'fflate'

import LRUCache from './utils/LRUCache'

import type {DeflateOptions} from 'fflate'

export class URLParamCompressor {
    private paramsMap: LRUCache<Map<string, string>>
    private debug: boolean
    private deflateOptions: DeflateOptions

    constructor(options?: {cacheCapacity?: number; debug?: boolean; deflateOptions?: DeflateOptions}) {
        this.paramsMap = new LRUCache(options?.cacheCapacity ?? 100)
        this.debug = !!options?.debug

        this.deflateOptions = {
            level: options?.deflateOptions?.level ?? 6,
            mem: options?.deflateOptions?.mem,
            dictionary: options?.deflateOptions?.dictionary,
        }
    }

    private stringToUint8Array(value: string) {
        return new TextEncoder().encode(value)
    }

    private uint8ArrayToString(value: Uint8Array) {
        return new TextDecoder().decode(value)
    }

    private uint8ArrayToBase64URL(uint8: Uint8Array) {
        const makeUrlSafe = (base64: string) => base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

        if (typeof Buffer !== 'undefined') {
            return makeUrlSafe(Buffer.from(uint8).toString('base64'))
        }

        let binary = ''
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < uint8.length; i++) {
            binary += String.fromCharCode(uint8[i])
        }
        return makeUrlSafe(btoa(binary))
    }

    private base64URLToUint8Array(base64: string) {
        const restoreBase64 = (urlSafe: string) => {
            const base64URL = urlSafe.replace(/-/g, '+').replace(/_/g, '/')
            return base64URL.length % 4 === 0 ? base64URL : base64URL + '='.repeat(4 - (base64URL.length % 4))
        }

        if (typeof Buffer !== 'undefined') {
            return new Uint8Array(Buffer.from(restoreBase64(base64), 'base64'))
        }

        const binary = atob(restoreBase64(base64))
        const len = binary.length
        const uint8 = new Uint8Array(len)
        for (let i = 0; i < len; i++) {
            uint8[i] = binary.charCodeAt(i)
        }
        return uint8
    }

    /**
     * @description url 쿼리 파라미터를 압축하여 url-safe base64 인코딩한 결과를 리턴합니다.
     *
     * @param {object} urlObj - 쿼리 파라미터를 key-value 형태로 전달합니다. value는 반드시 인코딩되어 있어야 합니다.
     * @returns {{result: string, isCompressed: boolean}} 압축 결과와 압축 여부를 리턴합니다. 압축 결과가 원본보다 용량이 크다면 압축하지 않고 원본 객체를 string으로 변환하여 리턴합니다.
     */
    compress(urlObj: Record<string, string>): {result: string; isCompressed: boolean} {
        const param = new URLSearchParams(urlObj).toString()
        const compressed = this.uint8ArrayToBase64URL(deflateSync(this.stringToUint8Array(param), this.deflateOptions))
        const paramLen = param.length
        const compressedLen = compressed.length

        if (this.debug) {
            if (paramLen < compressedLen) {
                // eslint-disable-next-line no-console
                console.log('⚠️ Compression increased size - skipped.')
            } else {
                // eslint-disable-next-line no-console
                console.log(`📦 Compressed by ${((compressedLen / paramLen) * 100).toFixed(2)}%`)
            }
        }

        const result = paramLen <= compressedLen ? param : compressed
        const isCompressed = paramLen > compressedLen
        return {result, isCompressed}
    }

    /**
     *
     * @param {string} compressed - compressor로 압축된 결과를 전달합니다.
     * @returns {object} - 원본 객체를 리턴합니다. 압축 해제에 실패했다면 null을 리턴합니다.
     */
    decompress(compressed: string): Record<string, string> | null {
        try {
            const decompressed = this.uint8ArrayToString(
                inflateSync(this.base64URLToUint8Array(compressed), {dictionary: this.deflateOptions.dictionary}),
            )

            const decompressedParams = new URLSearchParams(decompressed)

            const result = Array.from(decompressedParams.keys()).reduce<Record<string, string>>((acc, key) => {
                acc[key] = decompressedParams.get(key)!
                return acc
            }, {})

            this.paramsMap.put(compressed, new Map(Object.entries(result)))

            return result
        } catch (error) {
            if (this.debug) {
                // eslint-disable-next-line no-console
                console.error(error)
            }

            return null
        }
    }

    /**
     *
     * @param {string} compressed - compressor로 압축된 결과를 전달합니다.
     * @param {string} key - 추출하고 싶은 쿼리 파라미터의 key를 전달합니다.
     * @returns
     */
    get(compressed: string, key: string) {
        if (this.paramsMap.get(compressed) === undefined) {
            this.decompress(compressed)
        }

        return this.paramsMap.get(compressed)?.get(key)
    }
}
