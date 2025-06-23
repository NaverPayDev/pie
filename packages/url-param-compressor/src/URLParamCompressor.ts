import {deflateSync, inflateSync} from 'fflate'

export class URLParamCompressor {
    private stringToUint8Array(value: string) {
        return new TextEncoder().encode(value)
    }

    private Uint8ArrayToString(value: Uint8Array) {
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
        if (typeof Buffer !== 'undefined') {
            return new Uint8Array(Buffer.from(base64, 'base64'))
        }

        const binary = atob(base64)
        const len = binary.length
        const uint8 = new Uint8Array(len)
        for (let i = 0; i < len; i++) {
            uint8[i] = binary.charCodeAt(i)
        }
        return uint8
    }

    compress(urlObj: Record<string, string>) {
        const param = Object.keys(urlObj)
            .map((key) => `${key}=${urlObj[key]}`)
            .join('&')

        const compressed = Object.keys(urlObj)
            .map((key) => `${key}=${this.uint8ArrayToBase64URL(deflateSync(this.stringToUint8Array(urlObj[key])))}`)
            .join('&')

        if (param.length <= compressed.length) {
            return param
        }

        return compressed
    }

    decompress(compressedParams: string, paramKeys: string[]) {
        const param = new URLSearchParams(compressedParams)

        try {
            const result = paramKeys.reduce<Record<string, string>>((acc, key) => {
                if (param.has(key)) {
                    acc[key] = this.Uint8ArrayToString(inflateSync(this.base64URLToUint8Array(param.get(key)!)))
                }

                return acc
            }, {})

            return result
        } catch {
            return {}
        }
    }
}
