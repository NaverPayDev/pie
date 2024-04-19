import {readFileSync, readdirSync} from 'fs'
import path from 'path'

import {globSync} from 'glob'
import semver from 'semver'

import type {SidebarsConfig} from '@docusaurus/plugin-content-docs'

const docsPath = path.join(process.cwd(), 'docs')
const pkgRootPath = path.join(process.cwd(), '..', '..', 'packages')

const readmdMdPaths = globSync('**/README.md', {
    cwd: docsPath,
    ignore: ['**/node_modules/**'],
}).sort()

const docsSidebar: SidebarsConfig = {}

readmdMdPaths.forEach((readmdMdPath) => {
    const packageName = readmdMdPath.split('/')[0]
    const packageJsonPath = `${pkgRootPath}/${packageName}/package.json`
    const {name} = JSON.parse(readFileSync(packageJsonPath, 'utf8'))

    const mdPaths: string[] = globSync('**/*.md', {
        cwd: path.join(docsPath, packageName),
        ignore: ['**/node_modules/**'],
    })
        .sort((a, b) => {
            if (a.includes('README.md')) {
                return -1
            }
            if (b.includes('README.md')) {
                return 1
            }
            return a.localeCompare(b)
        })
        .filter((md) => !md.includes('CHANGELOG.md'))
        .map((mdPath) => `${packageName}/${mdPath}`.replace(/\.md$/, ''))
        .filter((mdPath) => semver.valid(mdPath.split('/')[1]))

    const versions = readdirSync(path.join(docsPath, packageName), {withFileTypes: true})
        .filter((dirent) => {
            return dirent.isDirectory() && semver.valid(dirent.name.split('/')[0])
        })
        .map((dirent) => dirent.name)
        .sort((a, b) => (semver.gt(a, b) ? -1 : 1))

    const versionCategoryItems = versions.map((version) => {
        return {
            [version]: globSync(`**/*.md`, {
                cwd: path.join(docsPath, packageName, version),
            }).map((fileName) => `${packageName}/${version}/${fileName.replace(/\.md$/, '')}`),
        }
    })
    docsSidebar[name] = [...mdPaths, ...versionCategoryItems]
})

const sidebars: SidebarsConfig = {
    docsSidebar,
}

export default sidebars
