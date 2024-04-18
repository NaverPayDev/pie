import path from 'path'

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
    stories: ['../../../packages/**/*.stories.mdx', '../../../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
        {
            name: '@storybook/addon-styling-webpack',
            options: {
                rules: [
                    // Replaces any existing Sass rules with given rules
                    {
                        test: /\.(css|scss|sass)$/i,
                        use: [
                            'style-loader',
                            'css-loader',
                            {
                                loader: 'sass-loader',
                                options: {implementation: require('sass')},
                            },
                        ],
                    },
                ],
            },
        },
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {
            builder: {
                useSWC: true,
            },
        },
    },
    swc: () => ({
        jsc: {
            transform: {
                react: {
                    runtime: 'automatic',
                },
            },
        },
    }),
    docs: {
        autodocs: 'tag',
    },
    webpackFinal(config) {
        config.resolve.alias = {
            ...config.resolve.alias,
            react: path.resolve(__dirname, '../node_modules/react'),
            'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
            'core-js/modules': path.resolve(__dirname, '../node_modules/core-js/modules'),
        }
        return config
    },
}
export default config
