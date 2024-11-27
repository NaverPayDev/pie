import path from 'path'

import browserslist from '@naverpay/browserslist-config'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import builtins from 'builtin-modules'
import postcss from 'rollup-plugin-postcss'
import preserveDirectives from 'rollup-plugin-preserve-directives'

import type {RollupOptions, OutputOptions, ModuleFormat} from 'rollup'

function verifyPackageJSON(packageDir: string) {
    const packageJSON = require(path.join(packageDir, 'package.json'))

    if (!packageJSON.files) {
        throw new Error('package.json에 file 필드가 필요합니다. 이 필드는 npm publish 시에 배포되는 파일 목록입니다.')
    }

    if (!(packageJSON.main || packageJSON.exports['.'])) {
        throw new Error('package.json에 main, exports 필드가 필요합니다.')
    }

    return packageJSON
}

const SUPPORT_MODULES: readonly ModuleFormat[] = ['cjs', 'esm']

function getBabelPresets({react, ie}: Pick<GenerateRollupConfigOptions, 'react' | 'ie'>) {
    const presetEnv = [
        '@babel/preset-env',
        {
            useBuiltIns: 'usage',
            targets: ie ? '> 0.25%, not dead, ie >= 11, not op_mini all' : browserslist.join(', '),
            corejs: {version: 3.29, proposals: false},
        },
    ]

    if (!react) {
        return [presetEnv, '@babel/preset-typescript']
    }

    return [presetEnv, '@babel/preset-typescript', ['@babel/preset-react', {runtime: react.runtime}]]
}

//
interface GenerateRollupConfigOptions {
    entrypoint: string | Record<'index' & string, string>
    outpoint?: {
        require: string
        import: string
        types: string
    }
    outputPaths?: OutputOptions['paths']
    packageDir: string
    extensions?: string[]
    plugins: RollupOptions['plugins']
    react: false | {runtime: 'classic' | 'automatic'}
    scss: false | {ssr: boolean}
    ie: boolean
    minify: boolean
    supportModules?: readonly ModuleFormat[]
}

export function generateRollupConfig({
    entrypoint,
    outpoint,
    packageDir,
    extensions = ['.ts', '.tsx'],
    plugins: extraPlugins = [],
    react = false,
    scss = false,
    ie = false,
    minify = true,
    outputPaths = {},
    supportModules = SUPPORT_MODULES,
}: GenerateRollupConfigOptions): RollupOptions[] {
    const packageJSON = verifyPackageJSON(packageDir)
    const pkgTypeField = packageJSON.type

    const isESMTypePkg = pkgTypeField === 'module'
    const isCJSTypePkg = pkgTypeField === undefined || pkgTypeField === 'commonjs'

    // type 필드도 있는데 exports에 require, import가 있는 경우 경고
    if (pkgTypeField && packageJSON?.exports?.['.']?.require && packageJSON?.exports?.['.']?.import) {
        // eslint-disable-next-line no-console
        console.warn(
            `package.json의 type을 설정하시는 것 보다 exports를 사용한 dual package export를 추천합니다. type 필드는 dual 패키지가 아닐 때만 사용해주세요. 참고: https://nodejs.org/api/packages.html#dual-commonjses-module-packages`,
        )
    }

    const outputPath = outpoint || (packageJSON.exports ? packageJSON.exports['.'] : packageJSON.main)

    const input: Record<'index' | string, string> =
        typeof entrypoint === 'string'
            ? {index: path.join(packageDir, entrypoint)}
            : Object.entries(entrypoint).reduce(
                  (acc, [key, value]) => ({...acc, [key]: path.join(packageDir, value)}),
                  {},
              )

    return supportModules.map((module) => {
        const isCommonJS = module === 'cjs'
        const isESM = module === 'esm'

        if (!isCommonJS && !isESM) {
            throw new Error('module은 cjs 또는 esm만 지원합니다.')
        }

        const normalizeOutput = (exportPath: string | {default: string}) => {
            return typeof exportPath === 'string' ? exportPath : exportPath?.default
        }

        const buildOutput =
            typeof outputPath === 'object'
                ? normalizeOutput(isCommonJS ? outputPath.require : outputPath.import)
                : outputPath

        const output: OutputOptions[] = [
            {
                format: module,
                dir: path.dirname(buildOutput),
                ...(isESM
                    ? {
                          entryFileNames: `[name]${path.extname(buildOutput)}`,
                          preserveModulesRoot: path.dirname(input.index),
                          preserveModules: true,
                      }
                    : {
                          exports: 'auto',
                      }),
                paths: {
                    ...outputPaths,
                    // https://github.com/facebook/react/issues/20235#issuecomment-750911623
                    // https://github.com/facebook/react/issues/20235#issuecomment-1095340542
                },
            },
        ]

        output.forEach((item) => {
            const ext = typeof item.entryFileNames === 'string' ? item.entryFileNames : undefined

            if (isESM && !isESMTypePkg && ext && path.extname(ext) !== '.mjs') {
                throw new Error(
                    `ESM 타입의 패키지는 .mjs 확장자를 사용해야 합니다. package.json의 type 필드를 module로 바꾸거나, entrypoint의 확장자를 .mjs로 바꿔주세요. ${JSON.stringify(
                        item,
                    )}`,
                )
            }

            if (isCommonJS && !isCJSTypePkg && ext && ['.js', '.cjs'].includes(path.extname(ext))) {
                throw new Error(
                    `CommonJS 타입의 패키지는 .js 또는 .cjs 확장자를 사용해야 합니다. package.json의 type 필드를 commonjs로 바꾸거나, entrypoint의 확장자를 .js 또는 .cjs로 바꿔주세요. ${JSON.stringify(
                        item,
                    )}`,
                )
            }
        })

        const plugins = [
            resolve({
                extensions,
            }),
            commonjs(),
            babel({
                babelHelpers: 'bundled',
                exclude: /node_modules/,
                extensions,
                presets: getBabelPresets({react, ie}),
                plugins: [
                    ['@babel/plugin-proposal-decorators', {version: '2022-03'}],
                    '@babel/plugin-transform-class-properties',
                ],
            }),
            json(),
            ...(scss !== false
                ? [
                      postcss({
                          extract: scss.ssr,
                          modules: true,
                          extensions: ['.scss'],
                          use: {
                              sass: {
                                  includePaths: [path.resolve('node_modules')],
                              },
                              stylus: undefined,
                              less: undefined,
                          },
                      }),
                  ]
                : []),
            ...(minify ? [terser()] : []),
            ...extraPlugins,
            ...(isESM ? [preserveDirectives()] : []),
        ]

        return {
            input,
            output,
            plugins,
            external: [
                ...Object.keys(packageJSON?.dependencies || []),
                ...Object.keys(packageJSON?.peerDependencies || []),
                ...builtins,
                ...(react && react.runtime === 'automatic' ? ['react/jsx-runtime'] : []),
            ],
        }
    })
}
