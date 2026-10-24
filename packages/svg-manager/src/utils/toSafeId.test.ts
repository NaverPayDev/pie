import {describe, expect, test} from 'vitest'

import toSafeId from './toSafeId'

describe('toSafeId', () => {
    test('안전한 문자(영숫자/_/-)는 그대로 둔다', () => {
        expect(toSafeId('abc_DEF-123')).toBe('abc_DEF-123')
    })

    test('selector-unsafe 문자를 _로 치환한다', () => {
        expect(toSafeId(':r0:')).toBe('_r0_')
        expect(toSafeId('a.b c(d)')).toBe('a_b_c_d_')
    })
})
