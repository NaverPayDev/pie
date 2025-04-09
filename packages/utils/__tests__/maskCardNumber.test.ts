import {describe, expect, it} from 'vitest'

import maskCardNumber from '../src/utils/maskCardNumber'

describe('카드번호를 마스킹', () => {
    // 앞자리 4개, 뒷자리 4개를 제외하고 마스킹
    // 예시)  1234-****-****-5678
    const TEST_MAP = [
        ['01234567890', '0123***7890'],
        ['01234567890123456789', '0123************6789'],
        ['', ''],
    ] as const

    it.each(TEST_MAP)('%s %s', (cardNumber, maskedCardNumber) => {
        const result = maskCardNumber(cardNumber)
        expect(result).toBe(maskedCardNumber)
    })
})
