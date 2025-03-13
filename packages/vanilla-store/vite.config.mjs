import {createViteConfig} from '@naverpay/pite'

export default createViteConfig({
    cwd: '.',
    entry: ['./src/index.ts'],
    skipRequiredPolyfillCheck: ['esnext.json.parse'],
    options: {
        minify: false,
    },
})
