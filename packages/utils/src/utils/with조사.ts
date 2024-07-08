import {조사Option} from '../constants/hangul'
import get조사 from './get조사'

/**
 * @description 한글 단어의 마지막 단어에 따라 단어 + 조사를 반환합니다.
 * @returns string
 */
const with조사 = (word: string, 조사: 조사Option) => {
    return `${word}${get조사(word, 조사)}`
}

export default with조사
