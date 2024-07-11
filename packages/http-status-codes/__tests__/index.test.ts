import {HttpStatusCodes, ReasonPhrases} from '../src/index'

describe('HTTP Status Codes Utility', () => {
    describe('HttpStatusCodes', () => {
        it('should have correct status codes', () => {
            expect(HttpStatusCodes.OK).toBe(200)
            expect(HttpStatusCodes.NOT_FOUND).toBe(404)
            expect(HttpStatusCodes.INTERNAL_SERVER_ERROR).toBe(500)
        })

        it('should have all standard HTTP status codes', () => {
            expect(Object.keys(HttpStatusCodes).length).toBeGreaterThanOrEqual(60) // 표준 HTTP 상태 코드의 대략적인 수
        })
    })

    describe('ReasonPhrases', () => {
        it('should have a reason phrase for every status code', () => {
            Object.values(HttpStatusCodes).forEach((code) => {
                expect(ReasonPhrases[code]).toBeDefined()
                expect(typeof ReasonPhrases[code]).toBe('string')
            })
        })
    })

    describe('Consistency', () => {
        it('should have matching keys in HttpStatusCodes and ReasonPhrases', () => {
            Object.values(HttpStatusCodes).forEach((code) => {
                expect(ReasonPhrases[code]).toBeDefined()
            })
        })
    })
})
