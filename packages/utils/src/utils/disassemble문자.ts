import 한글_여부 from './한글_여부'
import {가_CHAR_CODE, 중성, 초성, 종성} from '../constants/hangul'

/**
 * @description 한글 한글자를 초성/중성/종성으로 분리합니다. ex) 밟 > ㅂ / ㅏ / ㄹㅂ
 * 유니코드 한글은 0xAC00 으로부터 초성 19개, 중성21개, 종성28개로 이루어지고 이들을 조합한 11,172개의 문자를 갖습니다.
 * '가' 문자로 부터 차이를 구한 뒤, 그 차이를 28로 나눈 나머지가 0 이라면 받침이 없는 글자입니다.
 * @returns {first:string, middle:string, last:string} | undefined (한글이 아닌경우)
 */
const disassemble문자 = (letter: string) => {
    if (!letter || !한글_여부(letter)) {
        return undefined
    }
    const charCode = letter.charCodeAt(0)
    const hangulCode = charCode - 가_CHAR_CODE

    const lastIndex = hangulCode % 28
    const middleIndex = ((hangulCode - lastIndex) / 28) % 21
    const firstIndex = Math.floor((hangulCode - lastIndex) / 28 / 21)

    return {
        first: 초성[firstIndex],
        middle: 중성[middleIndex],
        last: 종성[lastIndex],
    }
}

export default disassemble문자
