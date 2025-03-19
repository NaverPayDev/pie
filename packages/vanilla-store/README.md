# @naverpay/vanilla-store

![NPM Version](https://img.shields.io/npm/v/%40naverpay%2Fvanilla-store)
![NPM bundle size](https://img.shields.io/bundlephobia/min/%40naverpay%2Fvanilla-store)
![NPM Downloads](https://img.shields.io/npm/dw/%40naverpay%2Fvanilla-store)

`@naverpay/vanilla-store` is a zero-dependency and extremely lightweight React state management solution.

## key features

- dual package exports (commonjs, esmodule)
- fully tested
- support external sync with Session and Local Storage

## Minimum requirements

- `react@^18.0.0`
- <https://github.com/NaverPayDev/browserslist-config>

> "Why does it only support React 18 or later?"
>
> It operates based on React@18's useSyncExternalStore, therefore, lower versions are not supported. While it is possible to provide backward compatibility using a [shim](https://www.npmjs.com/package/use-sync-external-store), we are not considering it as it unnecessarily increases the bundle size.

## Comparison

- [recoil](https://bundlephobia.com/package/recoil@0.7.7): 79.4kb
- [jotai](https://bundlephobia.com/package/jotai@2.8.0): 8.7kb
- `@naverpay/vanilla-store`: [3.8kb](https://bundlephobia.com/package/@naverpay/vanilla-store@0.1.0) with polyfill!

## Features

### `createVanillaStore`

스토어를 만드는 API 입니다. 컴포넌트 외부 등 반복적으로 실행될 여지가 없는 독립적인 환경에서 생성해야 올바르게 한번만 만들어질 수 있습니다.

#### Signatures

```ts
const createVanillaStore: (initialState: State, equalityFn?: (left: State, right: State) => boolean, options?: {
    persist: {
        type: PersistType;
        key: string;
        typeAssertion: (value: unknown) => value is State;
    } | undefined;
}): {
    set: SetAction<State>;
    get: () => State;
    subscribe: (callback: () => void) => () => void;
    persistStore: Persistent<State> | null;
}
```

**arguments**

- `arguments[0]` (required): 만들고자 하는 스토어의 기본값 입니다.
- `arguments[1]` (optional): 참조안정성을 보장하기 위한 동등 비교 함수입니다. 무분별한 객체 재생성으로 인한 메모리 누수 오류가 발생하거나, 성능을 최적화하고자 할 때 정의합니다. 기본값은 [`shallowEqual`](https://github.com/NaverPayDev/pie/blob/main/packages/vanilla-store/src/shallowEqual.ts)입니다.
- `arguments[2]` (optional): `options` 영역이며, 다음과 같은 값을 인수로 받습니다.
  - `persist`: 스토어의 값을 `localStorage`, `sessionStorage`, `redisStorage` (지원예정) 를 각각 인수로 받습니다.
  - `key`: 위 스토어에서 사용할 키 값입니다. 스토어에서는 이 값의 중복 여부를 현재 확인해주지 않습니다. (지원 예정) 반드시 스토어 간의 값의 유일성을 확인하시기 바랍니다.
  - `typeAssertion`: 외부 스토어 값은 대부분 믿을 수 없습니다. 타입 가드 함수를 여기에 넘겨주면, 타입이 맞는 경우에만 해당 스토어에 값으로 사용합니다. `typeAssertion`이 없으면 해당 값 자체를 스토어에 바로 할당합니다.

**return**

- `VanillaStore`
  - `get`: 현재 `VanillaStore`의 값을 확인할 수 있는 함수입니다.
  - `set`: 현재 `VanillaStore`의 값을 설정할 수 있는 함수입니다. `VanillaStore`의 `State`와 같은 타입을 받으며, 서버에서는 메모리 누수 또는 불필요한 중복 실행의 위험으로 인해 실행할 수 없습니다.
  - `subscribe`: 외부에 제공되는 값이 아닙니다. 현재 `VanillaStore`의 값 변경을 구독할 수 있는 함수입니다.
  - `persistStore`: 외부에 제공되는 값이 아닙니다. 현재 `VanillaStore`의 값을 외부에 저장하는 역할을 하는 인스턴스를 반환합니다.

#### Example

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

### `createVanillaSelect`

VanillaStore의 상태를 정제한 값을 상태로 관리할 때 사용됩니다. `createVanillaSelect`로부터 생성된 스토어는 읽기만 가능한 스토어로 외부에 `set`을 제공하지 않습니다.

#### Signatures

```ts
const createVanillaSelect: (store: {
    set: SetAction<StoreState>;
    get: () => StoreState;
    subscribe: (callback: () => void) => () => void;
    persistStore: Persistent<StoreState> | null;
}, selectFn: (state: StoreState) => State, equalityFn: (a: State, b: State) => boolean, options?: {
    persist: {
        type: PersistType;
        key: string;
        typeAssertion: (value: unknown) => value is State;
    } | undefined;
}): {
    set: () => void;
    get: () => State;
    subscribe: (callback: () => void) => () => void;
    persistStore: Persistent<State> | null;
}
```

**arguments**

- `arguments[0]` (required): 베이스 스토어입니다.
- `arguments[1]` (required): `arguments[0]`으로부터 새 값을 반환할 셀렉터 함수입니다.
- `arguments[2]` (required): 참조안정성을 보장하기 위한 동등 비교 함수입니다. 기본값은 [`shallowEqual`](https://github.com/NaverPayDev/pie/blob/main/packages/vanilla-store/src/shallowEqual.ts)입니다.
- `arguments[3]` (optional): `options` 영역이며, 다음과 같은 값을 인수로 받습니다.
  - `persist`: 스토어의 값을 `localStorage`, `sessionStorage`, `redisStorage` (지원예정) 를 각각 인수로 받습니다.
  - `key`: 위 스토어에서 사용할 키 값입니다. 스토어에서는 이 값의 중복 여부를 현재 확인해주지 않습니다. (지원 예정) 반드시 스토어 간의 값의 유일성을 확인하시기 바랍니다.
  - `typeAssertion`: 외부 스토어 값은 대부분 믿을 수 없습니다. 타입 가드 함수를 여기에 넘겨주면, 타입이 맞는 경우에만 해당 스토어에 값으로 사용합니다. `typeAssertion`이 없으면 해당 값 자체를 스토어에 바로 할당합니다.

**return**

- `VanillaSelect`
  - `get`: 현재 `VanillaSelect`의 값을 확인할 수 있는 함수입니다.
  - `set`: 외부에 제공되는 값이 아닙니다. 사용자는 `set`을 직접 호출할 수 없습니다. `persist` 옵션이 활성화되어있는 경우, 외부 스토어에 값을 동기화하는 용도입니다.
  - `subscribe`: 외부에 제공되는 값이 아닙니다. 현재 `VanillaSelect`의 값 변경을 구독할 수 있는 함수입니다.
  - `persistStore`: 외부에 제공되는 값이 아닙니다. 현재 `VanillaSelect`의 값을 외부에 저장하는 역할을 하는 인스턴스를 반환합니다.

#### Example

```ts
const personStore = createVanillaStore({
    name: {
        first: 'NaverPay',
        last: 'Dev',
    },
    address: {
        country: 'South Korea',
        city: 'Seoul'
    },
})

const addressStore = createVanillaSelect(personStore, ({address: {country, city}}) => `${city}, ${country}`)
```

### `useStore`

리액트 컴포넌트 내부에서 사용할 수 있는 스토어 훅입니다.

#### Signatures

```ts
function useStore<State>(store: VanillaSelect<State>, initialValue?: State): [State, never]
function useStore<State>(store: VanillaStore<State>, initialValue?: State): [State, SetAction<State>]
```

**arguments**

- `store`: `createVanillaStore`로 생성한 스토어를 넘겨주세요.

**return**

- `return[0]`: 현재 스토어의 값
- `return[1]`
  - `VanillaStore`: 현재 스토어의 값을 쓸 수 있는 함수를 반환합니다.
  - `VanillaSelect`: select의 경우 값을 쓸 수 없습니다.

#### Example

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

#### Signatures

```ts
function useStoreSelector<State, Value>(
    store: VanillaSelect<State>,
    selector: (state: State) => Value,
    options?: {initialStoreValue?: State; isEqual?: (a: Value, b: Value) => boolean},
): [Value, never]
function useStoreSelector<State, Value>(
    store: VanillaStore<State>,
    selector: (state: State) => Value,
    options?: {initialStoreValue?: State; isEqual?: (a: Value, b: Value) => boolean},
): [Value, SetAction<State>]
```

**arguments**

- `store`: `createVanillaStore`로 생성한 스토어를 넘겨주세요.
- `selector`: `store`에서 가져오고 싶은 값만 가져오는 함수를 넘겨주세요. 반드시 이 값은 참조 안정성이 보장되어 있어야 합니다. (`useCallback`또는 컴포넌트 외부 선언)

**return**

- `return[0]`: 현재 스토어의 값 중 `selector` 함수를 통해 반환된 값
- `return[1]`
  - `VanillaStore`: 현재 스토어의 값을 쓸 수 있는 함수를 반환합니다.
  - `VanillaSelect`: select의 경우 값을 쓸 수 없습니다.

#### Example

```tsx
function Name() {
    const nameSelector = useCallback((state: Store) => state.name, [])
    const [name] = useStoreSelector(store, nameSelector)

    return <div>{name}</div>
}
```
