import {createViteConfig} from '@naverpay/pite'
import legacy from '@vitejs/plugin-legacy'

export default createViteConfig({
    entry: [
        './src/index.ts',
        './src/pdfjs-dist/legacy/build/pdf.worker.entry.js',
        './src/pdfjs-dist/legacy/build/pdf.js',
        './src/pdfjs-dist/legacy/build/pdf.worker.js',
    ],
    allowedPolyfills: [
        'es.array.unshift',
        'web.self',
        'esnext.json.parse',
        'esnext.array.group',
        'esnext.string.at',
        'es.regexp.flags',
    ],
    ignoredPolyfills: ['es.array.push'],
    options: {
        rollupOptions: {
            plugins: [
                legacy({
                    targets: ['ie >= 11'],
                    modernPolyfills: true,
                }),
            ],
        },
    },
})
