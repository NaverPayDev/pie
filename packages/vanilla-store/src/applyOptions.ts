import {LocalStoragePersist, SessionStoragePersist} from './persist'

import type {Persistent} from './persist/type'
import type {Options} from './type'

export const applyPersist = <State>(options: Options<State> = {}, addCallbacks: () => void, initialState: State) => {
    let persistStore: Persistent<State> | null = null

    if (options?.persist) {
        const key = options.persist.key

        if (options.persist.type === 'localStorage') {
            persistStore = new LocalStoragePersist(key, initialState, options.persist.typeAssertion)
            addCallbacks()
        }

        if (options.persist.type === 'sessionStorage') {
            persistStore = new SessionStoragePersist(key, initialState, options.persist.typeAssertion)
            addCallbacks()
        }
    }

    return persistStore
}
