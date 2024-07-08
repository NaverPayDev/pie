import maskPhoneNumber from '../src/utils/maskPhoneNumber'

describe('전화번호를 마스킹', () => {
    // '개별번호 각각에 뒷자리 3개 마스킹
    // (3자리인 경우 뒷자리 2개 마스킹)
    // 예시) '031-1**-2*** / 010-1***-2***
    const TEST_MAP = [
        ['01012345678', '010-1***-5***'],
        ['01112345678', '011-1***-5***'],
        ['0101235678', '010-1**-5***'],
        ['0111235678', '011-1**-5***'],
        ['', ''],
    ] as const

    it.each(TEST_MAP)('%s %s', (phoneNumber, maskedPhoneNumber) => {
        const result = maskPhoneNumber(phoneNumber)
        expect(result).toBe(maskedPhoneNumber)
    })
})
