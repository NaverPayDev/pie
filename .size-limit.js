const path = require('path')
const glob = require('glob')
const fs = require('fs')

const packageJsonList = glob
    .globSync('**/package.json', {cwd: path.join(process.cwd(), 'packages')})
    .reduce((acc, filePath) => {
        const {name, main, private} = JSON.parse(
            fs.readFileSync(path.join(process.cwd(), 'packages', filePath), 'utf8'),
        )
        if (private) {
            return acc
        }
        const packageName = name.split('/')[1]
        acc.push({name: packageName, path: `packages/${packageName}${main.slice(1)}`, limit: '500 ms'})
        return acc
    }, [])

module.exports = packageJsonList
