import {copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync} from 'fs'
import * as path from 'path'

import {globSync} from 'glob'

import {DOCS_DIR, PKGS_DIR} from '../utils/path'

function copyFile(sourcePath: string, destinationPath: string) {
    const destinationDir = path.dirname(destinationPath)

    if (!existsSync(destinationDir)) {
        mkdirSync(destinationDir, {recursive: true})
    }

    copyFileSync(sourcePath, destinationPath)
}

export async function generateDocsFromCurrent() {
    if (!existsSync(DOCS_DIR)) {
        mkdirSync(DOCS_DIR, {recursive: true})
    }

    readdirSync(PKGS_DIR).forEach((pkgDirName) => {
        const pkgAbsPath = path.join(PKGS_DIR, pkgDirName)
        const {name} = JSON.parse(readFileSync(path.join(pkgAbsPath, 'package.json'), 'utf8'))
        const [packageScope, packageName] = name.split('/')
        const pkgDocsPath = path.join(DOCS_DIR, pkgDirName).replace(packageName, `${packageScope}/${packageName}`)

        const mdPaths = globSync('**/*.md', {
            cwd: pkgAbsPath,
            ignore: ['**/node_modules/**', '**/CHANGELOG.md'],
            absolute: true,
        })

        mdPaths.forEach((mdPath) => {
            copyFile(mdPath, mdPath.replace(path.join(PKGS_DIR, pkgDirName), path.join(pkgDocsPath, 'main')))
        })
    })
}
