import path from 'path'

import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import builtins from 'builtin-modules'
import postcss from 'rollup-plugin-postcss'
import preserveDirectives from 'rollup-plugin-preserve-directives'

import type {TransformOptions} from '@babel/core'
import type {RollupOptions, OutputOptions, ModuleFormat} from 'rollup'

function verifyPackageJSON(packageDir: string) {
    const packageJSON = require(path.join(packageDir, 'package.json'))

    if (!packageJSON.files) {
        throw new Error('package.json에 file 필드가 필요합니다. 이 필드는 npm publish 시에 배포되는 파일 목록입니다.')
    }

    return packageJSON
}

const SUPPORT_MODULES: readonly ModuleFormat[] = ['cjs', 'esm']

interface GenerateRollupConfigOptions {
    entrypoint: string | Record<'index' & string, string>
    outpoint?: {
        require: string
        import: string
        types: string
    }
    packageDir: string
    extensions?: string[]
    plugins: RollupOptions['plugins']
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
    scss = false,
    ie = true,
    minify = true,
    supportModules = SUPPORT_MODULES,
}: GenerateRollupConfigOptions): RollupOptions[] {
    const packageJSON = verifyPackageJSON(packageDir)

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

        const buildOutput =
            typeof outputPath === 'object' ? (isCommonJS ? outputPath.require : outputPath.import) : outputPath

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
            },
        ]

        const babelPreset: {presets?: TransformOptions['presets']} = ie
            ? {
                  presets: [
                      [
                          '@babel/preset-env',
                          {
                              useBuiltIns: 'usage',
                              targets: '> 0.25%, not dead, ie >= 11, not op_mini all',
                              corejs: {version: 3.29, proposals: false},
                          },
                      ],
                  ],
              }
            : {}

        const plugins = [
            resolve({
                extensions,
            }),
            commonjs(),
            babel({
                babelHelpers: 'bundled',
                exclude: /node_modules/,
                rootMode: 'upward',
                extensions,
                ...babelPreset,
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
            preserveDirectives(),
            ...(minify ? [terser()] : []),
            ...extraPlugins,
            preserveDirectives(),
        ]

        return {
            input,
            output,
            plugins,
            external: [
                ...Object.keys(packageJSON?.dependencies || []),
                ...Object.keys(packageJSON?.peerDependencies || []),
                ...builtins,
            ],
        }
    })
}
