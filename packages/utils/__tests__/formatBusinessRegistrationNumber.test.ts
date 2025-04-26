import {describe, expect, test} from 'vitest'

import {formatBusinessRegistrationNumber} from '../src/utils/formatBusinessRegistrationNumber'

describe('formatBusinessRegistrationNumber', () => {
    test('format valid business numbers correctly', () => {
        expect(formatBusinessRegistrationNumber('204-13-81885')).toBe('2041381885')
        expect(formatBusinessRegistrationNumber('2041381885')).toBe('2041381885')
        expect(formatBusinessRegistrationNumber(['204', '13', '81885'])).toBe('2041381885')
    })

    test('return null for invalid business numbers', () => {
        expect(formatBusinessRegistrationNumber('123-45-67890')).toBeNull() // checksum 틀림
        expect(formatBusinessRegistrationNumber('1234567890')).toBeNull()
        expect(formatBusinessRegistrationNumber('204-1a-81885')).toBeNull() // 문자 포함
        expect(formatBusinessRegistrationNumber('204-13-8188a')).toBeNull()
        expect(formatBusinessRegistrationNumber('204138188')).toBeNull() // 9자리
        expect(formatBusinessRegistrationNumber('20413818856')).toBeNull() // 11자리
    })
})
