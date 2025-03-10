import {applyPersist} from './applyOptions'
import shallowEqual from './shallowEqual'

import type {Persistent} from './persist/type'
import type {Options, SetAction, VanillaStore} from './type'

const isServer = typeof window === 'undefined'
export interface Subscription<Value> {
    getCurrentValue: () => Value
    subscribe: (callback: () => void) => () => void
}

export const createVanillaStore = <State>(
    initialState: State,
    equalityFn: (a: State, b: State) => boolean = shallowEqual,
    options?: Options<State>,
): VanillaStore<State> => {
    let state = initialState

    const callbacks = new Set<() => void>()

    const get = () => state
    const set = (nextState: State | ((prev: State) => State)) => {
        const next = typeof nextState === 'function' ? (nextState as (prev: State) => State)(state) : nextState

        if (!equalityFn(next, state)) {
            state = next
            callbacks.forEach((callback) => callback())
        }

        return state
    }

    let persistStore: Persistent<State> | null = null

    const addCallbacks = () =>
        callbacks.add(() => {
            if (persistStore) {
                persistStore.value = get()
            }
        })

    const subscribe = (callback: () => void) => {
        callbacks.add(callback)
        return () => {
            callbacks.delete(callback)
        }
    }

    const storeBase = {get, set, subscribe}

    // Return read-only store on server.
    if (isServer) {
        return {
            get: storeBase.get,
            set: (() => {
                // eslint-disable-next-line no-console
                console.error('[서버 스토어 오류] set 메서드는 클라이언트에서만 호출 가능합니다')

                return initialState
            }) as unknown as SetAction<State>,
            subscribe: storeBase.subscribe,
            persistStore: null,
        }
    }

    persistStore = applyPersist(options, addCallbacks, initialState)

    return {...storeBase, persistStore}
}
