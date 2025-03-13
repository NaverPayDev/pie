import {createViteConfig} from '@naverpay/pite'

export default createViteConfig({
    cwd: '.',
    cssFileName: 'style.css',
    entry: {
        index: './src/index.ts',
        'pdf.worker': './node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
    },
    skipRequiredPolyfillCheck: ['es.array.push'],
    options: {
        minify: false,
    },
})
