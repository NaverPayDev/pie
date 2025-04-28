import {describe, expect, test} from 'vitest'

import formatKoreanPhoneNumber from '../src/utils/formatKoreanPhoneNumber'

describe('formatKoreanPhoneNumber', () => {
    test('valid phone numbers are formatted correctly', () => {
        expect(formatKoreanPhoneNumber('01012345678')).toBe('01012345678')
        expect(formatKoreanPhoneNumber('010-1234-5678')).toBe('01012345678')
        expect(formatKoreanPhoneNumber('010 1234 5678')).toBe('01012345678')
        expect(formatKoreanPhoneNumber(['010', '1234', '5678'])).toBe('01012345678')
        expect(formatKoreanPhoneNumber('011-234-5678')).toBe('0112345678')
        expect(formatKoreanPhoneNumber('011-2345-678')).toBe('0112345678')
        expect(formatKoreanPhoneNumber('010  1234   5678')).toBe('01012345678') // 공백 여러 개
    })

    test('invalid phone numbers return null', () => {
        expect(formatKoreanPhoneNumber('020-1234-5678')).toBeNull()
        expect(formatKoreanPhoneNumber('010-1234')).toBeNull()
        expect(formatKoreanPhoneNumber('')).toBeNull()
        expect(formatKoreanPhoneNumber('010-123')).toBeNull() // 8자리 미만
        expect(formatKoreanPhoneNumber('0101234567890')).toBeNull() // 12자리 이상
        expect(formatKoreanPhoneNumber('010-12#34-5678')).toBeNull() // 특수문자(#) 포함
        expect(formatKoreanPhoneNumber('010-12@34-5678')).toBeNull() // 특수문자(@) 포함
        expect(formatKoreanPhoneNumber('010-12*34-5678')).toBeNull() // 특수문자(*) 포함
        expect(formatKoreanPhoneNumber('010-12(34-5678')).toBeNull() // 특수문자(() 포함
        expect(formatKoreanPhoneNumber('010-12)34-5678')).toBeNull() // 특수문자()) 포함
        expect(formatKoreanPhoneNumber('   ')).toBeNull() // 공백만 입력
        expect(formatKoreanPhoneNumber('abcdefg')).toBeNull() // 문자만
        expect(formatKoreanPhoneNumber('@#$%^&')).toBeNull() // 특수문자만
    })
})
