import {조사Option} from '../constants/hangul'
import disassemble문자 from './disassemble문자'
import 마지막_문자_받침_여부 from './마지막_문자_받침_여부'

/**
 * @description 한글 단어의 마지막 단어에 따라 조사를 가지고 옵니다. 받침이 ㄹ 이고 조사가 으로/로라면 로를 반환합니다.
 * @returns string
 */
const get조사 = (word: string, 조사: 조사Option) => {
    const has받침 = 마지막_문자_받침_여부(word)
    let index = has받침 ? 0 : 1
    const is종성ㄹ = disassemble문자(word[word.length - 1])?.last === 'ㄹ'

    if (조사 === '와/과' || (has받침 && is종성ㄹ && 조사 === '으로/로')) {
        index = index === 0 ? 1 : 0
    }

    return 조사.split('/')[index]
}

export default get조사
