import {createViteConfig} from '@naverpay/pite'

export default createViteConfig({
    cwd: '.',
    cssFileName: 'style.css',
    entry: ['./src/index.ts'],
    ignoredPolyfills: ['es.array.push'],
    options: {
        minify: false,
    },
})
