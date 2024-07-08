import maskAccountNumber from '../src/utils/maskAccountNumber'

describe('계좌번호를 마스킹', () => {
    // 앞자리 3개, 뒷자리 4개를 제외하고 마스킹
    // 예시)  123-***-****4567
    const TEST_MAP = [
        ['01234567890', '012****7890'],
        ['01234567890123456789', '012*************6789'],
        ['', ''],
    ] as const

    it.each(TEST_MAP)('%s %s', (accountNumber, maskedAccountNumber) => {
        const result = maskAccountNumber(accountNumber)
        expect(result).toBe(maskedAccountNumber)
    })
})
