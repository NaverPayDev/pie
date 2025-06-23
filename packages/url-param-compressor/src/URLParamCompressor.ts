import {deflateSync, inflateSync} from 'fflate'

export class URLParamCompressor {
    private paramsMap: Map<string, Map<string, string>>

    constructor() {
        this.paramsMap = new Map()
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

    compress(urlObj: Record<string, string>) {
        const param = new URLSearchParams(urlObj).toString()

        const compressed = this.uint8ArrayToBase64URL(deflateSync(this.stringToUint8Array(param)))

        return param.length <= compressed.length ? param : compressed
    }

    decompress(compressedParams: string) {
        try {
            const decompressed = this.uint8ArrayToString(inflateSync(this.base64URLToUint8Array(compressedParams)))

            const decompressedParams = new URLSearchParams(decompressed)

            const result = Array.from(decompressedParams.keys()).reduce<Record<string, string>>((acc, key) => {
                acc[key] = decompressedParams.get(key)!
                return acc
            }, {})

            this.paramsMap = this.paramsMap.set(compressedParams, new Map(Object.entries(result)))

            return result
        } catch {
            return {}
        }
    }

    get(compressed: string, key: string) {
        if (!this.paramsMap.has(compressed)) {
            this.decompress(compressed)
        }

        return this.paramsMap.get(compressed)?.get(key)
    }
}
