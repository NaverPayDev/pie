import {createViteConfig} from '@naverpay/pite'
import react from '@vitejs/plugin-react'

export default createViteConfig({
    entry: ['./src/index.ts'],
    options: {
        minify: false,
        rollupOptions: {
            plugins: [
                react({
                    jsxRuntime: 'classic',
                }),
            ],
        },
    },
})
