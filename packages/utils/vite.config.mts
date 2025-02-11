import {createViteConfig} from '@naverpay/pite'

export default createViteConfig({
    entry: ['./src/index.ts'],
    options: {
        minify: false,
    },
})
