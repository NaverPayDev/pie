# @naverpay/vanilla-store

`@naverpay/vanilla-store` is a zero-dependency and extremely lightweight React state management solution.

## key features

- dual package exports (commonjs, esmodule)
- fully tested
- support external sync with Session and Local Storage

## Minimum requirements

- `react@^18.0.0`
- <https://github.com/NaverPayDev/browserslist-config>

> "Why does it only support React 18?"
>
> It operates based on React@18's useSyncExternalStore, therefore, lower versions are not supported. While it is possible to provide backward compatibility using a [shim](https://www.npmjs.com/package/use-sync-external-store), we are not considering it as it unnecessarily increases the bundle size.

## Comparison

- [recoil](https://bundlephobia.com/package/recoil@0.7.7): 79.4kb
- [jotai](https://bundlephobia.com/package/jotai@2.8.0): 8.3kb
- `@naverpay/vanilla-store`: 6.6kb with polyfill!

## [WIP] Features

### `createVanillaStore`

스토어를 만드는 API 입니다. 컴포넌트 외부 등 반복적으로 실행될 여지가 없는 독립적인 환경에서 생성해야 올바르게 한번만 만들어질 수 있습니다.

#### arguments

- `arguments[0]` (req): 만들고자 하는 스토어의 기본값 입니다.
- `arguments[1]` (optional): `options` 영역이며, 다음과 같은 값을 인수로 받습니다.
  - `persist`: 스토어의 값을 `localStorage`, `sessionStorage`, `redisStorage` (지원예정) 를 각각 인수로 받습니다.
  - `key`: 위 스토어에서 사용할 키 값입니다. 스토어에서는 이 값의 중복 여부를 현재 확인해주지 않습니다. (지원 예정) 반드시 스토어 간의 값의 유일성을 확인하시기 바랍니다.
  - `typeAssertionFunction`: 외부 스토어 값은 대부분 믿을 수 없습니다. 타입 가드 함수를 여기에 넘겨주면, 타입이 맞는 경우에만 해당 스토어에 값으로 사용합니다. 만약 없다면 해당 값을 그냥 스토어에 바로 넣어버립니다.

#### return

- `store`
  - `get`: 현재 `store`의 값을 확인할 수 있는 함수입니다.
  - `set`: 현재 `store`의 값을 설정하라 수 있는 함수입니다. `store`와 같은 타입을 받으며, 서버에서는 메모리 누수 또는 불필요한 중복 실행의 위험으로 인해 실행할 수 없습니다.
  - `subsciribe`: 현재 `store`의 값 변경을 구독할 수 있는 함수입니다. 일반적으로 이 함수는 사용하실 필요가 없습니다.
  - `persistStore`: 현재 `store`의 값을 외부에 저장하는 역할을 하는 인스턴스를 반환합니다. 일반적으로 이 인스턴스는 사용할 필요가 없습니다.

#### exmaple

```tsx
type Store = {
    name: string
    age: number
}

function isStoreValue(value: unknown): value is Store {
    if (typeof value !== 'object') {
        return false
    }
    if (value === null) {
        return false
    }
    if (typeof (value as any).name !== 'string') {
        return false
    }
    if (typeof (value as any).age !== 'number') {
        return false
    }
    return true
}

const store = createVanillaStore<Store>(
    {name: '김용찬', age: 30},
    {persist: {type: 'sessionStorage', key: 'myname', typeAssertion: isStoreValue}},
)
```

### `useStore`

리액트 컴포넌트 내부에서 사용할 수 있는 스토어 훅입니다.

#### `arguments`

- `store`: `createVanillaStore`로 생성한 스토어를 넘겨주세요.

#### `return`

- `return[0]`: 현재 스토어의 값
- `return[1]`: 현재 스토어의 값을 쓸 수 있는 함수를 반환 (`store.set`)

#### example

```tsx
const [state, setStore] = useStore(store)

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStore((prev) => {
        return {...prev, name: e.target.value}
    })
}

return (
    <>
        <h2>{state.name}</h2>
        <h3>{state.age}</h3>
        <input type="text" value={state.name} onChange={handleChange} />
    </>
)
```

### `useStoreSelector`

리액트 컴포넌트 내부에서 사용할 수 있는 스토어 훅입니다. `useStore`와 다르게, `store`가 객체인 경우 필요한 값만 뽑아서 사용할 수 있습니다. `store` 값이 객체라 하더라도, 해당 `selector`의 값이 변경되지 않았다면 리렌더링을 야기하지 않습니다.

#### `arguments`

- `store`: `createVanillaStore`로 생성한 스토어를 넘겨주세요.
- `selector`: `store`에서 가져오고 싶은 값만 가져오는 함수를 넘겨주세요. 반드시 이 값은 참조 안정성이 보장되어 있어야 합니다. (`useCallback`또는 컴포넌트 외부 선언)

#### `return`

- `return[0]`: 현재 스토어의 값 중 `selector` 함수를 통해 반환된 값
- `return[1]`: 현재 스토어의 값을 쓸 수 있는 함수를 반환 (`store.set`)

#### example

```tsx
function Name() {
    const nameSelector = useCallback((state: Store) => state.name, [])
    const [name] = useStoreSelector(store, nameSelector)

    return <div>{name}</div>
}
```

### `useSyncWithClientPersistStore`

클라이언트에서만 확인 가능한 `sessionStorage` `localStorage`의 값을 초기값으로 사용하고 싶은 경우 이 훅을 이용해주세요. 이훅을 사용하면 해당 스토리지에 `key`에 해당하는 값이 있을 경우, `createVanillaStore`로 생성된 초기값을 무시하고 이 스토리지의 값을 초기 값으로 사용합니다.

#### `arguments`

- `store`: `createVanillaStore`로 생성한 스토어를 넘겨주세요.

#### `example`

```tsx
function isStoreValue(value: unknown): value is Store {
    if (typeof value !== 'object') {
        return false
    }
    if (value === null) {
        return false
    }
    if (typeof (value as any).name !== 'string') {
        return false
    }
    if (typeof (value as any).age !== 'number') {
        return false
    }
    return true
}

const store = createVanillaStore<Store>(
    {name: '김용찬', age: 15},
    {persist: {type: 'sessionStorage', key: 'myname', typeAssertion: isStoreValue}},
)

function Main() {
    const [state, setStore] = useStore(store)

    // sessionstorage에 key 'myname'의 값이 존재하는 경우
    // 그리고 타입 가드 함수를 통과하게 되면 store의 초기값 대신 sessionStorage 값을 사요함
    useSyncWithClientPersistStore(store, isStoreValue)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStore((prev) => {
            return {...prev, name: e.target.value}
        })
    }

    return (
        <>
            <h2>{state.name}</h2>
            <h3>{state.age}</h3>
            <input type="text" value={state.name} onChange={handleChange} />
        </>
    )
}
```
