import {가_CHAR_CODE, 힣_CHAR_CODE} from '../constants/hangul'

/**
 * @description 단어가 한글인지 확인하는 유틸입니다.
 * @returns boolean
 */
const 한글_여부 = (letter: string) => {
    const charCode = letter.charCodeAt(0)
    if (isNaN(charCode) || charCode < 가_CHAR_CODE || charCode > 힣_CHAR_CODE) {
        return false
    }
    return true
}

export default 한글_여부
