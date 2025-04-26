import {describe, expect, test} from 'vitest'

import {isValidBusinessRegistrationNumber} from '../src/utils/isValidBusinessRegistrationNumber'

describe('isValidBusinessRegistrationNumber', () => {
    test('valid business numbers', () => {
        expect(isValidBusinessRegistrationNumber('204-13-81885')).toBe(true)
        expect(isValidBusinessRegistrationNumber('2041381885')).toBe(true)
        expect(isValidBusinessRegistrationNumber(['204', '13', '81885'])).toBe(true)
    })

    test('invalid business numbers - wrong checksum', () => {
        expect(isValidBusinessRegistrationNumber('123-45-67890')).toBe(false)
        expect(isValidBusinessRegistrationNumber('1234567890')).toBe(false)
    })

    test('invalid business numbers - wrong length', () => {
        expect(isValidBusinessRegistrationNumber('204138188')).toBe(false) // 9자리
        expect(isValidBusinessRegistrationNumber('20413818856')).toBe(false) // 11자리
    })

    test('invalid business numbers - non-digit characters', () => {
        expect(isValidBusinessRegistrationNumber('204-1a-81885')).toBe(false)
        expect(isValidBusinessRegistrationNumber('204-13-8188a')).toBe(false)
    })
})
