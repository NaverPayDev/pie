import {applyPersist} from './applyOptions'
import {Persistent} from './persist/type'
import {Options} from './type'

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

export const createVanillaStore = <State>(initialState: State, options?: Options<State>): VanillaStore<State> => {
    let state = initialState

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

    let persistStore: Persistent<State> | null = null

    const addCallbacks = () =>
        callbacks.add(() => {
            if (persistStore) {
                persistStore.value = get()
            }
        })

    persistStore = applyPersist(options, addCallbacks, initialState)

    const subscribe = (callback: () => void) => {
        callbacks.add(callback)
        return () => {
            callbacks.delete(callback)
        }
    }

    return {get, set, subscribe, persistStore}
}
