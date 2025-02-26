import {generateRollupConfig} from '@naverpay/rollup'

module.exports = generateRollupConfig({
    packageDir: __dirname,
    entrypoint: './src/index.ts',
    react: {runtime: 'automatic'},
    scss: {ssr: false},
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    supportModules: ['cjs'],
})
