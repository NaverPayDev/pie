import {generateRollupConfig} from '@naverpay/rollup'

module.exports = generateRollupConfig({
    packageDir: __dirname,
    entrypoint: {
        index: './src/index.ts',
        'pdf.worker': './node_modules/pdfjs-dist/build/pdf.worker.min.mjs',
    },
    react: {runtime: 'automatic'},
    scss: {ssr: false},
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    supportModules: ['cjs'],
})
