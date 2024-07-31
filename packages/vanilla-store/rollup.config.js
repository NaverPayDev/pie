import {generateRollupConfig} from '@naverpay/rollup'

module.exports = generateRollupConfig({
    packageDir: __dirname,
    entrypoint: './src/index.ts',
    minify: false,
})
