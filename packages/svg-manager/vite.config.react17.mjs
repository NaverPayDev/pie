import {fileURLToPath} from 'node:url'
import path from 'path'

import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    build: {
        minify: false,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'SvgManager',
            formats: ['es', 'cjs'],
            fileName: (format) => `react17/${format === 'es' ? 'esm' : 'cjs'}/index.${format === 'es' ? 'mjs' : 'js'}`,
        },
        rollupOptions: {
            jsx: 'react',
            external: ['react', 'react-dom'],
            output: [
                {
                    format: 'es',
                    entryFileNames: 'react17/esm/index.mjs',
                },
                {
                    format: 'cjs',
                    entryFileNames: 'react17/cjs/index.js',
                    exports: 'named',
                    interop: 'auto',
                    generatedCode: 'es2015',
                },
            ],
        },
    },
    plugins: [
        react({
            jsxRuntime: 'classic',
        }),
    ],
})
