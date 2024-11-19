import {createVanillaSelect} from './select'
import {createVanillaStore} from './store'

describe('Select', () => {
    test('get result of selectFn', () => {
        const sampleObject = {count: 0, name: 'hello'}
        const store = createVanillaStore(sampleObject)
        const select = createVanillaSelect(store, (st) => st.count)

        expect(select.get()).toBe(0)
    })

    test('get result of selectFn after store.set()', () => {
        const sampleObject = {count: 0, name: 'hello'}
        const store = createVanillaStore(sampleObject)
        const select = createVanillaSelect(store, (st) => st.count)

        store.set((prev) => ({
            ...prev,
            count: prev.count + 1,
        }))

        expect(select.get()).toBe(1)
    })

    test('get result of selectFn with equalityFn()', () => {
        const store = createVanillaStore('Naver Pay')
        const select = createVanillaSelect(
            store,
            (str) => str.split(' '),
            (a, b) => a.length === b.length && a.every((elem, idx) => elem === b[idx]),
        )

        expect(select.get()).toStrictEqual(['Naver', 'Pay'])
    })
})
