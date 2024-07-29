// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as pdfjs from '../pdfjs-dist/legacy/build/pdf'

import type {PDFDocumentProxy, PDFLoadingTask} from '../pdfjs-dist/types/pdfjs'

export const isSSR = () => typeof window === 'undefined'
export const isLocalFileSystem = !isSSR() && window.location.protocol === 'file:'

export function loadFromFile(file: Blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () =>
            resolve(reader.result instanceof ArrayBuffer ? new Uint8Array(reader.result) : reader.result)
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

interface GetPdfDocumentParams {
    file: string | ArrayBuffer | Blob | File
    cMapUrl?: string | null
    cMapPacked?: boolean
}

export async function getPdfDocument({
    file,
    cMapUrl = null,
    cMapPacked = false,
}: GetPdfDocumentParams): Promise<PDFDocumentProxy> {
    if (isSSR()) {
        throw new Error('client side에서 실행시켜 주세요.')
    }

    pdfjs.GlobalWorkerOptions.workerSrc = require('./pdf.worker.entry')

    let source

    if (typeof file === 'string') {
        if (isDataURI(file)) {
            const fileUint8Array = dataURItoUint8Array(file)
            source = {data: fileUint8Array}
        } else {
            if (isLocalFileSystem) {
                // eslint-disable-next-line no-console
                console.error(
                    'Loading PDF as base64 strings/URLs might not work on protocols other than HTTP/HTTPS. On Google Chrome, you can use --allow-file-access-from-files flag for debugging purposes.',
                )
            }
            source = {url: file}
        }
    }

    // File is an ArrayBuffer
    if (file instanceof ArrayBuffer) {
        source = {data: file}
    }

    if (file instanceof Blob || file instanceof File) {
        source = {data: await loadFromFile(file)}
    }

    if (cMapUrl) {
        source = {...source, cMapUrl}
    }

    if (cMapPacked) {
        source = {...source, cMapPacked}
    }

    const {promise} = pdfjs.getDocument({...source, isEvalSupported: false}) as PDFLoadingTask<PDFDocumentProxy>
    const pdfInfo = await promise
    return pdfInfo
}

export function getPixelRatio() {
    return isSSR() ? 1 : window.devicePixelRatio
}
