import {applyPersist} from './applyOptions'
import {shallowEqual} from './shallowEqual'

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
                const setInServerError = new Error(
                    '[@naverpay/vanilla-store] The set method can only be called from the client',
                )
                const stack = setInServerError.stack

                // eslint-disable-next-line no-console
                console.error(
                    `
╔═══════════════════════════════════════════╗
║             SERVER STORE ERROR            ║
╚═══════════════════════════════════════════╝

⚠️  ${setInServerError.message}

%cSTACK TRACE%c
---------------
${stack}
`,
                    'font-weight: bold; color: red;',
                    'font-weight: normal;',
                )

                return initialState
            }) as unknown as SetAction<State>,
            subscribe: storeBase.subscribe,
            persistStore: null,
        }
    }

    persistStore = applyPersist(options, addCallbacks, initialState)

    return {...storeBase, persistStore}
}
