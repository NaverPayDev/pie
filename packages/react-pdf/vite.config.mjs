import {createViteConfig} from '@naverpay/pite'

export default createViteConfig({
    cwd: '.',
    cssFileName: 'style.css',
    entry: {
        index: './src/index.ts',
    },
    skipRequiredPolyfillCheck: ['es.array.push'],
    options: {
        minify: false,
    },
})
