import {createViteConfig} from '@naverpay/pite'

// @ts-check
export default createViteConfig({
    formats: ['es', 'cjs'],
    outDir: ['dist/esm', 'dist/cjs'],
    entry: './src/index',
    cwd: '.',
    ignoredPolyfills: ['esnext.json.parse'],
    options: {
        minify: false,
    },
})
