import {defineConfig} from 'vitest/config'

export default defineConfig({
    test: {
        include: ['src/**/*.test.ts'],
        reporters: ['default', 'html'],
    },
})
