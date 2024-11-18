import {useRef, useSyncExternalStore} from 'react'

import {useSyncPersistStore} from './persist/hooks'
import shallowEqual from './shallowEqual'
import {SetAction, VanillaSelect, VanillaStore} from './type'

export function useStore<State>(store: VanillaSelect<State>, initialValue?: State): [State, never]
export function useStore<State>(store: VanillaStore<State>, initialValue?: State): [State, SetAction<State>]
export function useStore<State>(store: VanillaStore<State> | VanillaSelect<State>, initialValue?: State) {
    const value = useSyncExternalStore(store.subscribe, store.get, () => initialValue || store.get())
    useSyncPersistStore(store, value)

    return [value, store.set] as const
}

export const useGetStore = <State>(store: VanillaStore<State> | VanillaSelect<State>, initialValue?: State) => {
    const value = useSyncExternalStore(store.subscribe, store.get, () => initialValue || store.get())
    useSyncPersistStore(store, value)

    return value
}

export function useSetStore<State>(store: VanillaSelect<State>, initialValue?: State): never
export function useSetStore<State>(store: VanillaStore<State>, initialValue?: State): SetAction<State>
export function useSetStore<State>(store: VanillaStore<State> | VanillaSelect<State>, initialValue?: State) {
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

export function useStoreSelector<State, Value>(
    store: VanillaSelect<State>,
    selector: (state: State) => Value,
    options?: {initialStoreValue?: State; isEqual?: (a: Value, b: Value) => boolean},
): [Value, never]
export function useStoreSelector<State, Value>(
    store: VanillaStore<State>,
    selector: (state: State) => Value,
    options?: {initialStoreValue?: State; isEqual?: (a: Value, b: Value) => boolean},
): [Value, SetAction<State>]
export function useStoreSelector<State, Value>(
    store: VanillaStore<State> | VanillaSelect<State>,
    selector: (state: State) => Value,
    options?: {initialStoreValue?: State; isEqual?: (a: Value, b: Value) => boolean},
) {
    const {initialStoreValue, isEqual} = options || {}
    const value = useSyncExternalStoreWithSelector(
        store.subscribe,
        store.get,
        () => initialStoreValue || store.get(),
        selector,
        isEqual,
    )
    return [value, store.set]
}
