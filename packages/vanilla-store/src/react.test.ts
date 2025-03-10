/* eslint-disable @typescript-eslint/no-explicit-any */
import {useCallback, useEffect, useRef} from 'react'

import {renderHook, act} from '@testing-library/react'

import {useGetStore, useSetStore, useStore, useStoreSelector} from './react'
import {createVanillaSelect} from './select'
import shallowEqual from './shallowEqual'
import {createVanillaStore} from './store'

interface SampleObject {
    count: number
    name: string
}
const sampleObject = {count: 0, name: 'hello'}
const sessionStorageKey = 'test'

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

export function createMockSessionStorage(storage: any) {
    const sessionStorageMock = (function () {
        let store: any = storage

        return {
            getItem: function (key: string) {
                return store[key]
            },
            setItem: function (key: string, value: string) {
                store[key] = value.toString()
            },
            clear: function () {
                store = {}
            },
        }
    })()

    Object.defineProperty(window, 'sessionStorage', {
        value: sessionStorageMock,
    })
}

const store = createVanillaStore(sampleObject, shallowEqual, {
    persist: {type: 'sessionStorage', key: sessionStorageKey, typeAssertion: isStoreValue},
})

afterEach(() => {
    // 스토어 초기화
    act(() => {
        store.set(sampleObject)
    })
})

describe('Store with react', () => {
    test('1. useStore 가 store.set으로 변경된 값을 가져온다.', () => {
        const newValue = {count: 1, name: 'world'}

        store.set(newValue)

        const {
            result: {current},
        } = renderHook(() => useStore(store))

        const [state] = current

        expect(state).toMatchObject(store.get())
    })

    test('2. useGetStore 가 store.set으로 변경된 값을 가져온다.', () => {
        const newValue = {count: 1, name: 'world'}

        store.set(newValue)

        const {
            result: {current: state},
        } = renderHook(() => useGetStore(store))

        expect(state).toMatchObject(store.get())
    })

    test('3. useStore 의 두번째 인자로 값을 설정할 수 있다.', () => {
        const newValue = {count: 1, name: 'world'}

        const {
            result,
            result: {current},
            rerender,
        } = renderHook(() => useStore(store))

        const [, setState] = current

        act(() => {
            setState(newValue)
        })
        rerender()

        expect(result.current[0]).toMatchObject(newValue)
    })

    test('4. useSetStore로 값을 설정할 수 있다.', () => {
        const newValue = {count: 1, name: 'world'}

        const {
            result: {current: setState},
            rerender,
        } = renderHook(() => useSetStore(store))

        act(() => {
            setState(newValue)
        })
        rerender()

        expect(store.get()).toMatchObject(newValue)
    })

    test('5. setStore로 기존 스토어와 같은 값을 반복적으로 설정해도 리렌더링이 트리거 되지 않는다.', () => {
        let renderCount = 0

        const {rerender} = renderHook(() => {
            const [state, setStore] = useStore(store)
            const {count} = state

            useEffect(() => {
                renderCount++
            }, [count])

            return [state, setStore] as const
        })

        /* rerender twice. */
        rerender()
        rerender()

        expect(renderCount).toBe(1)
    })

    test('6. sessionStorage의 값으로 store 초기 상태를 갱신한다. ', () => {
        const sessionStorageValue = {count: 1, name: 'session'}
        createMockSessionStorage({[sessionStorageKey]: JSON.stringify(sessionStorageValue)})

        const {
            result: {current},
        } = renderHook(() => {
            return useStore(store)
        })

        const [state] = current

        expect(state.name).toEqual(sessionStorageValue.name)
    })

    test('7. store 상태 변경에 따라 sessionStorage의 값도 갱신된다 ', () => {
        createMockSessionStorage({})
        const storeValue = {count: 1, name: 'store'}

        const {
            result,
            result: {current},
            rerender,
        } = renderHook(() => useStore(store))

        const [, setState] = current

        act(() => {
            setState(storeValue)
        })

        rerender()

        const sessionValue = JSON.parse(window.sessionStorage.getItem(sessionStorageKey) as unknown as string)

        expect(result.current[0]).toMatchObject(sessionValue)
    })

    test('8. useStoreSelector 가 선택한 값을 잘 가져온다.', () => {
        const newValue = {count: 1, name: 'world'}

        const {result, rerender} = renderHook(() => {
            const nameSelector = useCallback(() => store.get().name, [])

            return useStoreSelector(store, nameSelector)
        })

        act(() => {
            store.set(newValue)
        })

        rerender()

        expect(result.current[0]).toEqual(newValue.name)
    })

    test('9. useStoreSelector 는 자신이 가져오는 값외의 값이 변경되도 리렌더링이 되지 않는다.', () => {
        const newValue = {...sampleObject, name: 'hello'}

        const {
            result: {current},
            rerender,
        } = renderHook(() => {
            const selector = useCallback(() => store.get().count, [])
            const renderCount = useRef(0)
            const [count, setStore] = useStoreSelector(store, selector)

            useEffect(() => {
                renderCount.current++
            }, [count])

            return [count, setStore, renderCount] as const
        })

        const [, setStore, renderCount] = current

        // newValue는 count만 변경된 값이다. name은 기존 값과 같으므로
        act(() => {
            setStore(newValue)
        })

        // rerender를 호출해도 `useEffect`가 호출되지 않아 renderCount는 1이다.
        rerender()

        expect(renderCount.current).toBe(1)
    })
})

const countSelect = createVanillaSelect(store, ({count}) => count)
const nameSelect = createVanillaSelect(
    store,
    ({name}) => name.split(''),
    (a, b) => a.length === b.length && a.every((elem, idx) => elem === b[idx]),
)

describe('Select with react', () => {
    test('1. useGetStore가 select를 가져온다.', () => {
        const {
            result: {current},
        } = renderHook(() => useGetStore(countSelect))

        const state = current

        expect(state).toBe(0)
    })

    test('2. store가 업데이트된 후 useGetStore가 select를 가져온다.', () => {
        const newValue = {count: 1, name: 'world'}

        store.set(newValue)

        const {
            result: {current},
        } = renderHook(() => useGetStore(countSelect))

        const state = current

        expect(state).toBe(1)
    })

    test('3. 참조 안정성이 보장된다.', () => {
        const {result} = renderHook(() => useGetStore(nameSelect))

        const initialState = result.current

        act(() => {
            // store에 어떠한 상태 변경도 발생시키지 않음
        })

        const nextState = result.current

        expect(nextState).toBe(initialState)
    })
})
