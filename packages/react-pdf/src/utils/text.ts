import type {TextItem, TextMarkedContent} from 'pdfjs-dist/types/src/display/api'

function tokenizeTextItems(texts: TextItem[]) {
    return texts.reduce((result, textItem) => {
        const {str, width, transform, ...rest} = textItem
        const splittedStr = str.split(' ')
        const strLength = str.length
        const tokenizedStr = splittedStr.reduce((calculatedStr, s) => {
            const currentStrWidth = s.trim().length === 0 ? 4.5 : Math.ceil((width / strLength) * s.length) + 5
            const reducedStrsLength = calculatedStr.length
            const {width: lastWidth, transform: lastTransform} =
                reducedStrsLength === 0 ? {width: 0, transform: [...transform]} : calculatedStr[reducedStrsLength - 1]
            const newTransform = [...lastTransform]
            newTransform[4] += lastWidth + (reducedStrsLength === 0 ? 0 : 3.5)
            calculatedStr.push({str: s, width: currentStrWidth, transform: newTransform, ...rest})
            return calculatedStr
        }, [] as TextItem[])
        return [...result, ...tokenizedStr]
    }, [] as TextItem[])
}

export function mergeTextItems(texts: (TextItem | TextMarkedContent)[], options?: {tokenize?: boolean}) {
    const mergedTextItems = texts.reduce((result, token, index) => {
        if ('type' in token) {
            return result
        }
        if (index === 0) {
            result.push(token)
            return result
        }
        const prev = result[result.length - 1]
        // y 값을 비교하여, 같은 줄인지 확인
        if (prev.transform[5] === token.transform[5]) {
            prev.str = prev.str + token.str
            prev.width = prev.width + token.width
        } else {
            result.push(token)
        }

        return result
    }, [] as TextItem[])
    return options?.tokenize ? tokenizeTextItems(mergedTextItems) : mergedTextItems
}
