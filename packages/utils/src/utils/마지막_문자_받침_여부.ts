import {가_CHAR_CODE} from '../constants/hangul'
import 한글_여부 from './한글_여부'

/**
 * @description 한글의 마지막 단어 받침 여부를 확인하는 유틸입니다.
 * @returns boolean
 */
const 마지막_문자_받침_여부 = (word: string) => {
    const 마지막_문자 = word.slice(-1)
    const charCode = 마지막_문자.charCodeAt(0)

    return !isNaN(charCode) && 한글_여부(마지막_문자) && (charCode - 가_CHAR_CODE) % 28 !== 0
}

export default 마지막_문자_받침_여부
