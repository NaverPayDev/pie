import {applyPersist} from './applyOptions'
import {shallowEqual} from './shallowEqual'

import type {Persistent} from './persist/type'
import type {Options, VanillaSelect, VanillaStore} from './type'

export const createVanillaSelect = <State, StoreState>(
    store: VanillaStore<StoreState>,
    selectFn: (state: StoreState) => State,
    equalityFn: (a: State, b: State) => boolean = shallowEqual,
    options?: Options<State>,
): VanillaSelect<State> => {
    const callbacks = new Set<() => void>()

    let state: State = selectFn(store.get())

    const get = () => {
        const persistValue = store.persistStore?.value
        const currentValue = persistValue && !shallowEqual(persistValue, store.get()) ? persistValue : store.get()

        const next = selectFn(currentValue)

        if (!equalityFn(next, state)) {
            state = next
            return next
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

    persistStore = applyPersist(options, addCallbacks, selectFn(store.get()))

    const subscribe = (callback: () => void) => {
        callbacks.add(callback)

        // Add a subscription to detect changes in the original store (the store object from which the select is derived)
        const unsubscribeOriginalStore = store.subscribe(() => {
            const next = selectFn(store.get())
            if (!equalityFn(next, state)) {
                state = next
                callback()
            }
        })

        return () => {
            callbacks.delete(callback)
            unsubscribeOriginalStore()
        }
    }

    const set = () => {
        callbacks.forEach((callback) => callback())
    }

    return {get, set, subscribe, persistStore}
}
