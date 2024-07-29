import path from 'path'

import {globSync} from 'glob'

import type {SidebarsConfig} from '@docusaurus/plugin-content-docs'

const docsPath = path.join(process.cwd(), 'docs')

const readmdMdPaths = globSync('**/*/*.md', {
    cwd: docsPath,
    ignore: ['**/node_modules/**'],
}).sort()

const docsSidebar = {}

readmdMdPaths.forEach((readmdMdPath) => {
    const [packageScope, packageName] = readmdMdPath.split('/')
    const pkg = `${packageScope}/${packageName}`
    const documentId = readmdMdPath.replace('.md', '')

    if (docsSidebar[pkg]) {
        docsSidebar[pkg].push(documentId)
    } else {
        docsSidebar[pkg] = [documentId]
    }
})

const sidebars: SidebarsConfig = {
    docsSidebar,
}

export default sidebars
