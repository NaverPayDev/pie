if (typeof Promise.withResolvers === 'undefined') {
    Promise.withResolvers = <T>() => {
        let resolve: (value: T | PromiseLike<T>) => void
        let reject: (reason?: unknown) => void
        // eslint-disable-next-line promise/param-names
        const promise = new Promise<T>((res, rej) => {
            resolve = res
            reject = rej
        })
        return {promise, resolve: resolve!, reject: reject!}
    }
}

export * from './utils/pdf'
export * from './components/page/Canvas'
export * from './components/layer/Annotation'
export * from './components/layer/Text'
export * from './components/Pages'
export * from './contexts/pdf'
export * from './components/PdfViewer'
