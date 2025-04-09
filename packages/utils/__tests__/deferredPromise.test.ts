import {describe, expect, beforeEach, test, vi} from 'vitest'

import DeferredPromise from '../src/utils/deferredPromise'
import sleep from '../src/utils/sleep'

describe('DeferredPromise', () => {
    let deferredPromise: DeferredPromise<void | number>

    beforeEach(() => {
        deferredPromise = new DeferredPromise()
    })

    test('resolve 되면 then절 실행', async () => {
        const fn = vi.fn()
        deferredPromise.then(fn)
        deferredPromise.resolve()

        await sleep(0) // resolve 후 then 절이 동작하도록 한번 끊어주는 용도

        expect(fn).toBeCalled()
    })

    test('reject 되면 catch절 실행', async () => {
        const fn = vi.fn()
        deferredPromise.catch(fn)
        deferredPromise.reject()

        await sleep(0) // reject 후 then 절이 동작하도록 한번 끊어주는 용도

        expect(fn).toBeCalled()
    })

    test('resolve 되면 finally절 실행', async () => {
        const fn = vi.fn()
        deferredPromise.finally(fn)
        deferredPromise.resolve()

        await sleep(0) // resolve 후 then 절이 동작하도록 한번 끊어주는 용도

        expect(fn).toBeCalled()
    })

    test('promise로 취급 가능', async () => {
        // 의미없는 랜덤값
        const RESOLVED_VALUE = 2021

        // 미리 resolve
        deferredPromise.resolve(RESOLVED_VALUE)

        const result = await deferredPromise

        expect(result).toBe(RESOLVED_VALUE)
    })

    test('여러번 then 절을 사용해도 resolve후 모두 실행', async () => {
        const fn1 = vi.fn()
        const fn2 = vi.fn()
        const fn3 = vi.fn()

        deferredPromise.then(fn1)
        deferredPromise.then(fn2)
        deferredPromise.then(fn3)

        deferredPromise.resolve()
        await sleep(0) // resolve 후 then 절이 동작하도록 한번 끊어주는 용도

        expect(fn1).toBeCalled()
        expect(fn2).toBeCalled()
        expect(fn3).toBeCalled()
    })

    test('여러번 catch 절을 사용해도 reject 모두 실행', async () => {
        const fn1 = vi.fn()
        const fn2 = vi.fn()
        const fn3 = vi.fn()

        deferredPromise.catch(fn1)
        deferredPromise.catch(fn2)
        deferredPromise.catch(fn3)

        deferredPromise.reject()
        await sleep(0) // resolve 후 then 절이 동작하도록 한번 끊어주는 용도

        expect(fn1).toBeCalled()
        expect(fn2).toBeCalled()
        expect(fn3).toBeCalled()
    })
})
