import {defineConfig} from 'vitest/config'

// vitest가 vite.config.mjs(pite 빌드 설정)를 불러오지 않도록 분리한다.
export default defineConfig({
    test: {},
})
