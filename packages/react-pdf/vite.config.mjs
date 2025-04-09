import {createViteConfig} from '@naverpay/pite'

export default createViteConfig({
    cwd: '.',
    cssFileName: 'style.css',
    entry: {
        index: './src/index.ts',
    },
    skipRequiredPolyfillCheck: ['es.array.push'],
    includeRequiredPolyfill: ['es.promise.with-resolvers']
    options: {
        minify: false,
    },
})
