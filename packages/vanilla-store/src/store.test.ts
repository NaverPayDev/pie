import {shallowEqual} from './shallowEqual'
import {createVanillaStore} from './store'

interface SampleObject {
    count: number
    name: string
}

function isStoreValue(value: unknown): value is SampleObject {
    return (
        typeof value === 'object' &&
        value !== null &&
        'count' in value &&
        'name' in value &&
        typeof value.count === 'number' &&
        typeof value.name === 'string'
    )
}

const localStorageMock = (() => {
    let store: Record<string, string> = {}

    return {
        getItem(key: string) {
            return store[key] || null
        },
        setItem(key: string, value: string | number | unknown[]) {
            store[key] = value.toString()
        },
        removeItem(key: string) {
            delete store[key]
        },
        clear() {
            store = {}
        },
    }
})()

Object.defineProperty(window, 'sessionStorage', {
    value: localStorageMock,
})

describe('Store', () => {
    test('should be able to create a store', () => {
        const sampleObject = {count: 0, name: 'hello'}
        const store = createVanillaStore(sampleObject)

        expect(store.get()).toMatchObject(sampleObject)
    })

    test('should be able to set a store', () => {
        const sampleObject = {count: 0, name: 'hello'}
        const store = createVanillaStore(sampleObject)

        store.set({count: 1, name: 'world'})

        expect(store.get()).toMatchObject({count: 1, name: 'world'})
    })

    test('should be able to set value in store with callback function', () => {
        const sampleObject = {count: 0, name: 'hello'}
        const newValue = {count: 1, name: 'world'}
        const store = createVanillaStore(sampleObject)

        store.set((prev) => ({...prev, ...newValue}))

        expect(store.get()).toMatchObject(newValue)
    })

    test('should be able to subscribe a store', () => {
        const sampleObject = {count: 0, name: 'hello'}
        const store = createVanillaStore(sampleObject)

        const spy = jest.fn()
        store.subscribe(() => spy())

        store.set({count: 1, name: 'world'})

        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('should be able to set value in store with session storage', () => {
        const sampleObject = {count: 0, name: 'hello'}
        const sessionStorageKey = 'test'

        const store = createVanillaStore(sampleObject, shallowEqual, {
            persist: {type: 'sessionStorage', key: sessionStorageKey, typeAssertion: isStoreValue},
        })
        const newValue = {count: 1, name: 'world'}

        store.set(newValue)

        expect(store.get()).toEqual(JSON.parse(window.sessionStorage.getItem(sessionStorageKey) || ''))
    })
})
