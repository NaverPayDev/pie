import {useEffect} from 'react'

import {VanillaStore} from '../store'

export function useSyncPersistStore<State>(store: VanillaStore<State>, value: State) {
    useEffect(() => {
        if (store.persistStore?.value !== value) {
            if (store.persistStore?.value) {
                if (!store.persistStore.typeAssertion(store.persistStore.value)) {
                    // eslint-disable-next-line no-console
                    console.warn('Persisted value is not matched with the type assertion.')
                    return
                }
                const persistValue = store.persistStore.value
                store.set(() => persistValue)
            }
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
