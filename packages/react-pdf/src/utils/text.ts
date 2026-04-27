import type {TextItem, TextMarkedContent} from 'pdfjs-dist/types/src/display/api'

function tokenizeTextItems(texts: TextItem[]) {
    return texts.reduce((result, textItem) => {
        const {str, width, transform, ...rest} = textItem
        const words = str.split(' ')
        const totalChars = str.length

        if (totalChars === 0) {
            return result
        }

        const charWidth = width / totalChars
        let charOffset = 0

        const tokenized = words.reduce((acc, word, wordIndex) => {
            if (word.length > 0) {
                const newTransform = [...transform]
                newTransform[4] += charWidth * charOffset
                acc.push({str: word, width: charWidth * word.length, transform: newTransform, ...rest})
            }
            charOffset += word.length + (wordIndex < words.length - 1 ? 1 : 0)
            return acc
        }, [] as TextItem[])

        return [...result, ...tokenized]
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
            // item 간 gap을 포함한 전체 visual span 계산
            const prevEndX = prev.transform[4] + prev.width
            const gap = token.transform[4] - prevEndX
            prev.str = prev.str + token.str
            prev.width = prev.width + Math.max(0, gap) + token.width
        } else {
            result.push(token)
        }

        return result
    }, [] as TextItem[])
    return options?.tokenize ? tokenizeTextItems(mergedTextItems) : mergedTextItems
}
