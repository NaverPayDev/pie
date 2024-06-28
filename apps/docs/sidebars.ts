import {readdirSync} from 'fs'
import path from 'path'

import {globSync} from 'glob'
import semver from 'semver'

import type {SidebarsConfig} from '@docusaurus/plugin-content-docs'

const docsPath = path.join(process.cwd(), 'docs')

const readmdMdPaths = globSync('**/README.md', {
    cwd: docsPath,
    ignore: ['**/node_modules/**'],
}).sort()

const docsSidebar: SidebarsConfig = {}

readmdMdPaths.forEach((readmdMdPath) => {
    const [packageScope, packageName] = readmdMdPath.split('/')

    const versions = readdirSync(path.join(docsPath, packageScope, packageName), {withFileTypes: true})
        .filter((dirent) => {
            return (
                dirent.isDirectory() &&
                (dirent.name.split('/')[0] === 'main' || semver.valid(dirent.name.split('/')[0]))
            )
        })
        .map((dirent) => dirent.name)
        .sort((a, b) => ([a, b].includes('main') ? -1 : semver.gt(a, b) ? -1 : 1))

    const versionCategoryItems = versions.map((version) => {
        return {
            [version]: globSync(`**/*.md`, {
                cwd: path.join(docsPath, packageScope, packageName, version),
            }).map((fileName) => `${packageScope}/${packageName}/${version}/${fileName.replace(/\.md$/, '')}`),
        }
    })

    docsSidebar[`${packageScope}/${packageName}`] = [...versionCategoryItems]
})

const sidebars: SidebarsConfig = {
    docsSidebar,
}

export default sidebars
