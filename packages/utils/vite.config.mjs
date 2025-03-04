import {createViteConfig} from '@naverpay/pite'

export default createViteConfig({
    cwd: '.',
    entry: ['./src/index.ts'],
    options: {
        minify: false,
    },
})
