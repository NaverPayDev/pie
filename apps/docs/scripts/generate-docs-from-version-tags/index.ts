import * as fs from 'fs'
import * as path from 'path'

import {globSync} from 'glob'
import * as semver from 'semver'
import * as shell from 'shelljs'

import {INTERNAL_CONFIG} from '../docs.config'
import {parseTag} from '../utils/parseTag'
import {DOCS_DIR, PKGS_DIR, ROOT_DIR} from '../utils/path'
import {checkPackagesMinVersion} from './checkPackagesMinVersion'

export async function generateDocsFromVersionTags() {
    const {stdout: HEAD} = shell.exec('git rev-parse --short HEAD')
    checkPackagesMinVersion()

    const workDir = path.join(__dirname, './temp')

    fs.rmSync(workDir, {force: true, recursive: true})
    fs.mkdirSync(workDir, {recursive: true})

    shell.cd(workDir)
    shell.exec(`git clone https://github.com/NaverPayDev/pie.git ${workDir}`, {silent: true})

    for (const pkg of INTERNAL_CONFIG) {
        const {name, minVersion} = pkg
        const [packageScope, packageName] = name.split('/')

        // 태그 수집
        const {stdout} = shell.exec(`git tag -l "*${packageName}*"`, {silent: true})
        const tags = stdout.split('\n').slice(0, -1)

        // 카나리 버전 && 최소 버전 미만 제외
        const withoutCanaryOrBelowVersion = tags.filter((tag) => {
            const version = tag.split('@')[2]
            const isCanary = semver.prerelease(version) !== null
            const isBeforeMinVersion = semver.lt(version, minVersion)
            return !isCanary && !isBeforeMinVersion
        })

        const pkgDocsPath = path.join(DOCS_DIR, packageName)
        const pkgRootPath = path.join(PKGS_DIR, packageName)

        // 모든 버전별 md 파일 스트림으로 수집
        const files: {newPath: string; fileStream: Buffer}[] = []

        for (const tagName of withoutCanaryOrBelowVersion) {
            const {version} = parseTag(tagName)
            const pkgDocsVersionPath = path.join(
                pkgDocsPath.replace(packageName, ''),
                packageScope,
                packageName,
                version,
            )

            shell.exec(`git checkout ${tagName}`, {silent: true})

            const mdPaths = globSync('**/*.md', {
                cwd: pkgRootPath,
                ignore: ['**/node_modules/**', '**/CHANGELOG.md'],
                absolute: true,
            })

            files.push(
                ...mdPaths.map((mdPath) => {
                    return {
                        newPath: mdPath.replace(pkgRootPath, pkgDocsVersionPath),
                        fileStream: fs.readFileSync(mdPath),
                    }
                }),
            )
        }

        shell.exec(`git checkout main`, {silent: true})

        // 파일 저장
        files.forEach((file) => {
            const {newPath, fileStream} = file
            const destinationDir = path.dirname(newPath)
            if (!fs.existsSync(destinationDir)) {
                fs.mkdirSync(destinationDir, {recursive: true})
            }

            fs.writeFileSync(newPath, fileStream)
        })
    }

    shell.cd(ROOT_DIR)
    shell.exec(`git checkout ${HEAD}`)
    fs.rmSync(workDir, {force: true, recursive: true})
}
