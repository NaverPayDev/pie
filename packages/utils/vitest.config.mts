import {defineConfig} from 'vitest/config'

export default defineConfig({
    test: {
        environment: 'happy-dom',
        reporters: ['default', 'html'],
        pool: 'threads',
    },
})
