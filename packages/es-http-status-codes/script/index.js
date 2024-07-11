const fs = require('fs').promises
const path = require('path')

const BASE_DIR = __dirname
const JSON_FILE_PATH = path.join(BASE_DIR, '../data.json')
const HTTP_STATUS_CODES_FILE_PATH = path.join(BASE_DIR, '../src/status-code.ts')
const REASON_PHRASES_FILE_PATH = path.join(BASE_DIR, '../src/reason-phrase.ts')

async function readJsonFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error reading or parsing JSON file:', error)
        throw error
    }
}

function generateHttpStatusCodesContent(statusCodes) {
    let content = `/*This file is auto-generated. Do not edit directly.*/\n`
    content += `export const HttpStatusCodes = {\n`
    content += statusCodes.map((status) => `  ${status.constant}: ${status.code}`).join(',\n')
    content += `\n} as const;\n\n`
    content += `export type HttpStatusCode = typeof HttpStatusCodes[keyof typeof HttpStatusCodes];\n\n`
    content += `export type HttpStatusCodeKey = keyof typeof HttpStatusCodes;\n\n`
    content += `export const HttpStatusCodeKeys: HttpStatusCodeKey[] = [\n`
    content += statusCodes.map((status) => `  '${status.constant}'`).join(',\n')
    content += `\n];\n`
    return content
}

function generateReasonPhrasesContent(statusCodes) {
    let content = `/*This file is auto-generated. Do not edit directly.*/\n`
    content += `import { HttpStatusCodes, HttpStatusCode } from './status-code';\n\n`
    content += `export const ReasonPhrases: { [key in HttpStatusCode]: string } = {\n`
    content += statusCodes.map((status) => `  [HttpStatusCodes.${status.constant}]: "${status.phrase}"`).join(',\n')
    content += `\n} as const;\n`
    return content
}

async function writeFile(filePath, content) {
    try {
        await fs.mkdir(path.dirname(filePath), {recursive: true})
        await fs.writeFile(filePath, content)
        // eslint-disable-next-line no-console
        console.log(`File generated successfully: ${filePath}`)
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error writing file ${filePath}:`, error)
        throw error
    }
}

async function generateFiles() {
    try {
        const statusCodes = await readJsonFile(JSON_FILE_PATH)

        const httpStatusCodesContent = generateHttpStatusCodesContent(statusCodes)
        await writeFile(HTTP_STATUS_CODES_FILE_PATH, httpStatusCodesContent)

        const reasonPhrasesContent = generateReasonPhrasesContent(statusCodes)
        await writeFile(REASON_PHRASES_FILE_PATH, reasonPhrasesContent)

        // eslint-disable-next-line no-console
        console.log('All files generated successfully.')
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('An error occurred during file generation:', error)
    }
}

generateFiles()
