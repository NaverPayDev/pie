const path = require('path')
const glob = require('glob')
const fs = require('fs')

const packageJsonList = glob
    .globSync('**/package.json', {cwd: path.join(process.cwd(), 'packages')})
    .reduce((acc, filePath) => {
        const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'packages', filePath), 'utf8'))
        const {name, main, private} = packageJson
        const customSizeLimitConfig = packageJson['size-limit']

        // private package는 size limit 으로 측정하지 않습니다.
        if (private) {
            return acc
        }

        const packageName = name.split('/')[1]
        const sizeLimitConfig = {
            /** size limit config 기본값 */
            name,
            path: `packages/${packageName}${main.slice(1)}`,
            limit: '500 ms',

            /** 패키지 내부에 추가되어 있는 값
             * @see https://github.com/ai/size-limit
             */
            ...customSizeLimitConfig,
        }

        acc.push(sizeLimitConfig)
        return acc
    }, [])

module.exports = packageJsonList
