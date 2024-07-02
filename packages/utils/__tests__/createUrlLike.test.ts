/**
 * @jest-environment jsdom
 * @description 테스트를 위해 URL 클래스를 setup 과정에서 제거했다가 원복합니다.
 * jest-environment 주석으로 인해 순수 Node에서는 존재하지 않는 window 객체가 스코프에 존재합니다.
 * 함수에서 window 유무가 분기에 쓰이지만 window 객체를 제거하지 못하기 떄문에,
 * window.location을 대신 제거합니다.
 */
import createUrlLike from '../src/utils/createUrlLike'

/*
 * setup / 원복에 사용
 * */
const originalUrlPD = Object.getOwnPropertyDescriptor(global, 'URL')
const originalLocationPD = Object.getOwnPropertyDescriptor(window, 'location')

/*
 * createUrlLike 함수의 두 번째로 전달하는 base 변경
 * */
const baseOrigin = 'https://new-m.pay.naver.com'
// const baseOrigin = null

/*
 * createUrlLike 실행 환경에서 window.location.origin 변경
 * */
const windowLocationOrigin = undefined
// const windowLocationOrigin = 'https://location-origin.naver.com'

beforeAll(() => {
    expect(global.URL).not.toBeUndefined()
    expect(window.location.origin).not.toBeUndefined() // 순수 Node에서는 존재하지 않지만, @jest-environment 주석으로 인해 window가 존재합니다.
})
afterAll(() => {
    expect(global.URL).not.toBeUndefined()
    expect(window.location.origin).not.toBeUndefined() // 순수 Node에서는 존재하지 않지만, @jest-environment 주석으로 인해 window가 존재합니다.
})
describe(`createUrlLike: base origin은 "${baseOrigin}"으로 가정합니다.`, () => {
    beforeEach(() => {
        Object.defineProperty(window, 'location', {
            value: {
                origin: windowLocationOrigin,
            },
            writable: true,
        })
    })
    afterEach(() => {
        Object.defineProperty(window, 'location', originalLocationPD!)
        Object.defineProperty(global, 'URL', originalUrlPD!)
    })

    describe('protocol 추출', () => {
        test('javascript:alert(123) -> javascript', () => {
            const url = 'javascript:alert(123)'

            // URL 클래스 존재하는 상황
            expect(global.URL).not.toBeUndefined()
            const urlInstance = new URL(url, baseOrigin)
            expect(urlInstance.protocol).toEqual('javascript:')

            // URL 클래스 제거 : HTMLAnchorElement 모드
            Object.defineProperty(global, 'URL', {value: undefined, writable: true})
            expect(global.URL).toBeUndefined()

            const urlLike = createUrlLike(url, baseOrigin)
            expect(urlLike.protocol).toEqual('javascript:')
        })

        test('http://www.naver.com -> http', () => {
            const url = 'http://www.naver.com'

            // URL 클래스 존재하는 상황
            expect(global.URL).not.toBeUndefined()
            const urlInstance = new URL(url, baseOrigin)
            expect(urlInstance.protocol).toEqual('http:')

            // URL 클래스 제거 : HTMLAnchorElement 모드
            Object.defineProperty(global, 'URL', {value: undefined, writable: true})
            expect(global.URL).toBeUndefined()

            const urlLike = createUrlLike(url, baseOrigin)
            expect(urlLike.protocol).toEqual('http:')
        })
    })

    describe('origin 추출', () => {
        test('http://origin.com:3456/ -> http://origin.com:3456', () => {
            const url = 'http://origin.com:3456/'

            // URL 클래스 존재하는 상황
            expect(global.URL).not.toBeUndefined()
            const urlInstance = new URL(url, baseOrigin)
            expect(urlInstance.origin).toEqual('http://origin.com:3456')

            // URL 클래스 제거 : HTMLAnchorElement 모드
            Object.defineProperty(global, 'URL', {value: undefined, writable: true})
            expect(global.URL).toBeUndefined()

            const urlLike = createUrlLike(url, baseOrigin)
            expect(urlLike.origin).toEqual('http://origin.com:3456')
        })

        test('http://www.naver.com -> http', () => {
            const url = 'http://www.naver.com'

            // URL 클래스 존재하는 상황
            expect(global.URL).not.toBeUndefined()
            const urlInstance = new URL(url, baseOrigin)
            expect(urlInstance.protocol).toEqual('http:')

            // URL 클래스 제거 : HTMLAnchorElement 모드
            Object.defineProperty(global, 'URL', {value: undefined, writable: true})
            expect(global.URL).toBeUndefined()

            const urlLike = createUrlLike(url, baseOrigin)
            expect(urlLike.protocol).toEqual('http:')
        })
    })

    describe('origin 뒷부분 추출', () => {
        test('/path?query1=abc&query2=123#anchor -> pathname, search, hash 검증', () => {
            const url = '/path?query1=abc&query2=123#anchor'

            // URL 클래스 존재하는 상황
            expect(global.URL).not.toBeUndefined()
            const urlInstance = new URL(url, baseOrigin)

            expect(urlInstance.pathname).toEqual('/path')
            expect(urlInstance.search).toEqual('?query1=abc&query2=123')
            expect(urlInstance.hash).toEqual('#anchor')

            // URL 클래스 제거 : HTMLAnchorElement 모드
            Object.defineProperty(global, 'URL', {value: undefined, writable: true})
            expect(global.URL).toBeUndefined()

            const urlLike = createUrlLike(url, baseOrigin) as HTMLAnchorElement
            expect(urlLike.pathname).toEqual('/path')
            expect(urlLike.search).toEqual('?query1=abc&query2=123')
            expect(urlLike.hash).toEqual('#anchor')
        })
    })
})
