import {LocalStoragePersist, SessionStoragePersist} from './persist'
import {Persistent} from './persist/type'

export interface VanillaStore<State> {
    get: () => State
    set: (action: State | ((prev: State) => State)) => State
    subscribe: (callback: () => void) => () => void
    persistStore: Persistent<State> | null
}

export interface Subscription<Value> {
    getCurrentValue: () => Value
    subscribe: (callback: () => void) => () => void
}

type PersistType = 'localStorage' | 'sessionStorage'
interface Options<State> {
    persist?: {type: PersistType; key: string; typeAssertion: (value: unknown) => value is State}
}

export const createVanillaStore = <State>(initialState: State, options?: Options<State>): VanillaStore<State> => {
    let state = initialState
    let persistStore: Persistent<State> | null = null

    const callbacks = new Set<() => void>()

    const get = () => state
    const set = (nextState: State | ((prev: State) => State)) => {
        if (typeof window === 'undefined') {
            throw new Error('This function is not available in Server side.')
        }

        state = typeof nextState === 'function' ? (nextState as (prev: State) => State)(state) : nextState

        callbacks.forEach((callback) => callback())

        return state
    }

    if (options?.persist) {
        const key = options.persist.key
        if (options.persist.type === 'localStorage') {
            persistStore = new LocalStoragePersist(key, initialState, options.persist.typeAssertion)
            callbacks.add(() => {
                if (persistStore) {
                    persistStore.value = get()
                }
            })
        }

        if (options.persist.type === 'sessionStorage') {
            persistStore = new SessionStoragePersist(key, initialState, options.persist.typeAssertion)
            callbacks.add(() => {
                if (persistStore) {
                    persistStore.value = get()
                }
            })
        }
    }

    const subscribe = (callback: () => void) => {
        callbacks.add(callback)
        return () => {
            callbacks.delete(callback)
        }
    }

    return {get, set, subscribe, persistStore}
}
