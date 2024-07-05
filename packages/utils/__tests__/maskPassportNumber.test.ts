import maskPassportNumber from '../src/utils/maskPassportNumber'

describe('여권번호를 마스킹', () => {
    // 뒷자리 5개 마스킹
    // 예시) M488*****
    const TEST_MAP = [
        ['M00012345', 'M000*****'],
        ['', ''],
    ] as const

    it.each(TEST_MAP)('%s %s', (passport, maskedPassport) => {
        const result = maskPassportNumber(passport)
        expect(result).toBe(maskedPassport)
    })
})
