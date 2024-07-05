import maskEmail from '../src/utils/maskEmail'

describe('이메일을 마스킹', () => {
    // 이메일ID의 앞자리 2개를 제외하고 모두 마스킹
    // 이메일 도메인의 앞자리 1개를 제외하고 7개 마스킹
    // 단, 해당 계정의 네이버메일주소는 노출 가능(아이디와 동일)
    // 예시) pr*****@g*******.com,
    const TEST_MAP = [
        ['financial@naver.com', true, 'fi*******@n*******.com'],
        ['financail@pay.naver.com', true, 'fi*******@p*******.com'],
        ['', false, ''],
    ] as const

    it.each(TEST_MAP)('%s %s %s', (email, isValidEmail, maskedEmail) => {
        const result = maskEmail(email)
        expect(result).toEqual([isValidEmail, maskedEmail])
    })
})
