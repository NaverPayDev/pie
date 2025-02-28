import type {Persistent} from './persist/type'

type PersistType = 'localStorage' | 'sessionStorage'
export interface Options<State> {
    persist?: {type: PersistType; key: string; typeAssertion: (value: unknown) => value is State}
}

export interface Vanilla<State> {
    get: () => State
    subscribe: (callback: () => void) => () => void
    persistStore: Persistent<State> | null
}

export type SetAction<State> = (action: State | ((prev: State) => State)) => State
export interface VanillaStore<State> extends Vanilla<State> {
    set: SetAction<State>
}

export interface VanillaSelect<State> extends Vanilla<State> {
    set: () => void
}
