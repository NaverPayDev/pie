import {getDocument, GlobalWorkerOptions, version} from 'pdfjs-dist/legacy/build/pdf.mjs'

import type {DocumentInitParameters} from 'pdfjs-dist/types/src/display/api'

export const isSSR = () => typeof window === 'undefined'
export const isLocalFileSystem = !isSSR() && window.location.protocol === 'file:'

export function loadFromFile(file: Blob): Promise<string | Uint8Array> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            const result = reader.result instanceof ArrayBuffer ? new Uint8Array(reader.result) : reader.result
            if (!result) {
                reject(new Error('Error while reading a file.'))
                return
            }
            resolve(result)
        }

        reader.onerror = (event) => {
            reject(new Error(event.target?.error?.message || 'Error while reading a file.'))
        }
        reader.readAsArrayBuffer(file)
    })
}

export const isDataURI = (str: string) => /^data:/.test(str)

export function dataURItoUint8Array(dataURI: string) {
    if (!isDataURI(dataURI)) {
        throw new Error('dataURItoUint8Array was provided with an argument which is not a valid data URI.')
    }

    let byteString
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1])
    } else {
        byteString = unescape(dataURI.split(',')[1])
    }

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i)
    }

    return ia
}

type PdfFile = string | ArrayBuffer | Blob | File

async function getPdfFile(file: PdfFile) {
    if (typeof file === 'string') {
        if (isDataURI(file)) {
            const fileUint8Array = dataURItoUint8Array(file)
            return {data: fileUint8Array}
        } else {
            if (isLocalFileSystem) {
                // eslint-disable-next-line no-console
                console.error(
                    'Loading PDF as base64 strings/URLs might not work on protocols other than HTTP/HTTPS. On Google Chrome, you can use --allow-file-access-from-files flag for debugging purposes.',
                )
            }
            return {url: file}
        }
    }

    // File is an ArrayBuffer
    if (file instanceof ArrayBuffer) {
        return {data: file}
    }

    return {data: await loadFromFile(file)}
}

interface GetPdfDocumentParams {
    file: PdfFile
    workerSource?: string
    cMapUrl?: string | null
    cMapPacked?: boolean
    withCredentials?: boolean
}

export async function getPdfDocument({
    file,
    workerSource,
    cMapUrl = null,
    cMapPacked = false,
    withCredentials = false,
}: GetPdfDocumentParams) {
    if (isSSR()) {
        throw new Error('client side에서 실행시켜 주세요.')
    }

    GlobalWorkerOptions.workerSrc = workerSource || `//unpkg.com/pdfjs-dist@${version}/legacy/build/pdf.worker.min.mjs`

    const fileData = await getPdfFile(file)

    const source: DocumentInitParameters = {
        ...fileData,
        ...(withCredentials ? {withCredentials} : {}),
        ...(cMapUrl ? {cMapUrl} : {}),
        ...(cMapPacked ? {cMapPacked} : {}),
    }

    const {promise} = getDocument(source)
    const pdfInfo = await promise
    return pdfInfo
}

export function getPixelRatio() {
    return isSSR() ? 1 : window.devicePixelRatio
}
