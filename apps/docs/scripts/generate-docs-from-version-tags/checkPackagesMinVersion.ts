import * as fs from 'fs'
import * as path from 'path'

import {globSync} from 'glob'

import {INTERNAL_CONFIG} from '../docs.config'

const PKGS_DIR = path.join(__dirname, '../../../../../packages')

export function checkPackagesMinVersion() {
    const configuredPackages = INTERNAL_CONFIG.map((pkg) => pkg.name.split('/')[1])
    const packageJsons = globSync('**/package.json', {
        cwd: PKGS_DIR,
    }).map((filePath) => {
        const {name} = JSON.parse(fs.readFileSync(path.join(PKGS_DIR, filePath), 'utf8'))
        return name.split('/')[1]
    })

    if (configuredPackages.sort().toString() !== packageJsons.sort().toString()) {
        throw new Error('새로 추가한 패키지의 `minVersion`을 명시했는지 확인해 주세요')
    }
}
