import {themes as prismThemes} from 'prism-react-renderer'

import type * as Preset from '@docusaurus/preset-classic'
import type {Config} from '@docusaurus/types'

const config: Config = {
    title: 'pie',
    tagline: '네이버 페이에서 만드는 TypeScript, JavaScript 패키지',
    favicon: 'https://financial.pstatic.net/static/public/favicon-1.0.0.ico',

    // Set the production url of your site here
    url: 'https://naverpaydev.github.io/',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/pie/docs/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'frontend', // Usually your GitHub org/user name.
    projectName: 'pie', // Usually your repo name.

    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'ko',
        locales: ['ko'],
        localeConfigs: {
            ko: {
                htmlLang: 'ko-KR',
            },
        },
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    editUrl: (params) => {
                        const docPath = params.docPath.startsWith('@naverpay/')
                            ? params.docPath.replace('@naverpay/', '')
                            : params.docPath
                        return `https://github.com/NaverPayDev/pie/blob/main/packages/${docPath}`
                    },
                },
                blog: {
                    showReadingTime: true,
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        navbar: {
            title: 'pie',
            logo: {
                alt: 'pie',
                src: 'img/favicon-1.0.0.png',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'docsSidebar',
                    position: 'left',
                    label: 'Docs',
                },
                {
                    href: 'https://github.com/NaverPayDev/pie',
                    position: 'right',
                    className: 'header-github-link',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Blog',
                            to: '/blog',
                        },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/NaverPayDev/pie',
                        },
                    ],
                },
            ],
            copyright: `© ${new Date().getFullYear()}. NAVER Financial Corp. All Rights Reserved.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
        docs: {
            sidebar: {
                autoCollapseCategories: true,
            },
        },
    } satisfies Preset.ThemeConfig,

    markdown: {
        format: 'detect',
    },

    themes: [
        [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            {
                language: ['en', 'ko'],
                ignoreFiles: ['CHANGELOG.md'],
                highlightSearchTermsOnTargetPage: true,
            },
        ],
    ],
}

export default config
