import {defineConfig} from 'tsup'

const commonOptions = {
    entry: ['src/index.ts'],
    dts: {
        only: true,
    },
    clean: true,
    splitting: false,
    sourcemap: false,
    external: ['react', 'react-dom'],
}

export default defineConfig([
    {
        ...commonOptions,
        format: 'esm',
        outDir: 'dist/react17/esm',
        outExtension() {
            return {
                dts: '.d.mts',
            }
        },
    },
    {
        ...commonOptions,
        format: 'cjs',
        outDir: 'dist/react17/cjs',
    },
])
