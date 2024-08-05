import {useRef, useSyncExternalStore} from 'react'

import {useSyncPersistStore} from './persist/hooks'
import shallowEqual from './shallowEqual'
import {VanillaStore} from './store'

export const useStore = <State>(store: VanillaStore<State>, initialValue?: State) => {
    const value = useSyncExternalStore(store.subscribe, store.get, () => initialValue || store.get())
    useSyncPersistStore(store, value)

    return [value, store.set] as const
}

export const useGetStore = <State>(store: VanillaStore<State>, initialValue?: State) => {
    const value = useSyncExternalStore(store.subscribe, store.get, () => initialValue || store.get())
    useSyncPersistStore(store, value)

    return value
}

export const useSetStore = <State>(store: VanillaStore<State>, initialValue?: State) => {
    const value = useSyncExternalStore(store.subscribe, store.get, () => initialValue || store.get())
    useSyncPersistStore(store, value)

    return store.set
}

export function useSyncExternalStoreWithSelector<Snapshot, Selection>(
    subscribe: (onStoreChange: () => void) => () => void,
    getSnapshot: () => Snapshot,
    getServerSnapshot: undefined | (() => Snapshot),
    selector: (snapshot: Snapshot) => Selection,
    isEqual: (a: Selection, b: Selection) => boolean = shallowEqual,
): Selection {
    const initialSelection = selector(getSnapshot())
    const stateRef = useRef<Selection>(initialSelection)
    const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

    const selection = selector(snapshot)
    // 이전 상태와 현재 상태를 비교하여 필요할 때만 컴포넌트를 리렌더링
    if (!isEqual(selection, stateRef.current)) {
        stateRef.current = selection
    }

    return stateRef.current
}

export const useStoreSelector = <State, Value>(
    store: VanillaStore<State>,
    selector: (state: State) => Value,
    options?: {initialStoreValue?: State; isEqual?: (a: Value, b: Value) => boolean},
) => {
    const {initialStoreValue, isEqual} = options || {}
    const value = useSyncExternalStoreWithSelector(
        store.subscribe,
        store.get,
        () => initialStoreValue || store.get(),
        selector,
        isEqual,
    )
    return [value, store.set] as const
}
