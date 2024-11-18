import {applyPersist} from './applyOptions'
import {Persistent} from './persist/type'
import {Options, VanillaSelect, VanillaStore} from './type'

export const createVanillaSelect = <State, StoreState>(
    store: VanillaStore<StoreState>,
    selectFn: (state: StoreState) => State,
    options?: Options<State>,
): VanillaSelect<State> => {
    const callbacks = new Set<() => void>()

    const get = () => selectFn(store.get())

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
