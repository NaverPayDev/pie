import {applyPersist} from './applyOptions'
import {Persistent} from './persist/type'
import shallowEqual from './shallowEqual'
import {Options, VanillaSelect, VanillaStore} from './type'

export const createVanillaSelect = <State, StoreState>(
    store: VanillaStore<StoreState>,
    selectFn: (state: StoreState) => State,
    equalityFn: (a: State, b: State) => boolean = shallowEqual,
    options?: Options<State>,
): VanillaSelect<State> => {
    const callbacks = new Set<() => void>()

    let state: State = selectFn(store.get())

    const get = () => {
        const next = selectFn(store.get())

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
        return () => {
            callbacks.delete(callback)
        }
    }

    const set = () => {
        callbacks.forEach((callback) => callback())
    }

    return {get, set, subscribe, persistStore}
}
