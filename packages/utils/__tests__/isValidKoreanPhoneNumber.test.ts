import {describe, expect, test} from 'vitest'

import isValidKoreanPhoneNumber from '../src/utils/isValidKoreanPhoneNumber'

describe('isValidKoreanPhoneNumber', () => {
    test('valid phone numbers', () => {
        expect(isValidKoreanPhoneNumber('01012345678')).toBe(true)
        expect(isValidKoreanPhoneNumber('010-1234-5678')).toBe(true)
        expect(isValidKoreanPhoneNumber('010 1234 5678')).toBe(true)
        expect(isValidKoreanPhoneNumber(['010', '1234', '5678'])).toBe(true)
        expect(isValidKoreanPhoneNumber(['010', '123', '5678'])).toBe(true) // 10자리
        expect(isValidKoreanPhoneNumber('0111234567')).toBe(true)
        expect(isValidKoreanPhoneNumber('0171234567')).toBe(true)
        expect(isValidKoreanPhoneNumber('018-234-5678')).toBe(true)
        expect(isValidKoreanPhoneNumber('019 3456 7890')).toBe(true)
        expect(isValidKoreanPhoneNumber('011-2345-678')).toBe(true) // 자리수가 안맞지만 어쨌든 번호로 유효함
    })

    test('invalid phone numbers', () => {
        expect(isValidKoreanPhoneNumber('02012345678')).toBe(false) // 잘못된 앞자리
        expect(isValidKoreanPhoneNumber('010-1234')).toBe(false) // 자리수 부족
        expect(isValidKoreanPhoneNumber('010-12#34-5678')).toBe(false) // 특수문자 포함
        expect(isValidKoreanPhoneNumber('010123456789')).toBe(false) // 12자리 초과
        expect(isValidKoreanPhoneNumber('0101234')).toBe(false) // 7자리 부족
        expect(isValidKoreanPhoneNumber('')).toBe(false) // 빈 문자열
        expect(isValidKoreanPhoneNumber('010abcdefg')).toBe(false) // 문자 포함
        expect(isValidKoreanPhoneNumber('011-@34-5678')).toBe(false) // 특수문자 포함
    })
})
