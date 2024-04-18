import {copyFileSync, existsSync, mkdirSync, readdirSync, renameSync, rmSync} from 'fs'
import path from 'path'

import {glob} from 'glob'

function copyFile(sourcePath, destinationPath) {
    const destinationDir = path.dirname(destinationPath)

    if (!existsSync(destinationDir)) {
        mkdirSync(destinationDir, {recursive: true})
    }

    copyFileSync(sourcePath, destinationPath)
}

export async function generateDocs() {
    const docsPath = path.join(process.cwd(), 'docs')

    if (!existsSync(docsPath)) {
        mkdirSync(docsPath, {recursive: true})
    }

    const pkgRootPath = path.join(process.cwd(), '..', '..', 'packages')

    await Promise.all(
        readdirSync(pkgRootPath).map(async (pkgDirName) => {
            const pkgDocsPath = path.join(docsPath, pkgDirName)
            const tempDocsPath = path.join(docsPath, 'temp', pkgDirName)

            if (!existsSync(tempDocsPath)) {
                mkdirSync(tempDocsPath, {recursive: true})
            }

            const pkgAbsPath = path.join(pkgRootPath, pkgDirName)

            const mdPaths = await glob('**/*.md', {
                cwd: pkgAbsPath,
                ignore: ['**/node_modules/**'],
                absolute: true,
            })

            mdPaths.forEach((mdPath) => {
                copyFile(mdPath, mdPath.replace(path.join(pkgRootPath, pkgDirName), tempDocsPath))
            })

            if (existsSync(pkgDocsPath)) {
                rmSync(pkgDocsPath, {recursive: true})
            }

            renameSync(tempDocsPath, pkgDocsPath)
        }),
    )
}
