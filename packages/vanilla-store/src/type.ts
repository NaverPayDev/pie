type PersistType = 'localStorage' | 'sessionStorage'
export interface Options<State> {
    persist?: {type: PersistType; key: string; typeAssertion: (value: unknown) => value is State}
}
