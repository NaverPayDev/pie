# CLAUDE.md — @naverpay/vanilla-store

Framework-agnostic state management library with optional React bindings and persistence support.

## Commands

```bash
pnpm test    # vitest, watch=false
pnpm build   # CJS + ESM
```

## Architecture

```
src/
  store.ts         # createVanillaStore — core store primitive
  react.ts         # React hooks (useStore, useGetStore, useSetStore, useStoreSelector)
  select.ts        # createVanillaSelect — derived/computed stores
  shallowEqual.ts  # default equality function
  type.ts          # shared types (VanillaStore, VanillaSelect, SetAction, Options, ...)
  applyOptions.ts  # wires persist plugin into the store lifecycle
  persist/
    type.ts                  # abstract Persistent<Value> base class
    LocalStoragePersist.ts
    SessionStoragePersist.ts
    index.ts
```

## Key Design Decisions

**Server-side safety**: `createVanillaStore` detects `typeof window === 'undefined'` and returns a read-only store on the server. Calling `set` on the server logs a descriptive error and returns `initialState` — it does NOT throw.

**Equality**: Defaults to `shallowEqual`. Pass a custom `equalityFn` as the second argument to `createVanillaStore` to override.

**Persistence**: Pass `options` (third argument) to opt into `LocalStoragePersist` or `SessionStoragePersist`. The persist plugin is applied only on the client.

**React integration**: Uses `useSyncExternalStore`. `useStoreSelector` implements a ref-based selector to avoid unnecessary re-renders without requiring an external selector library.

**`createVanillaSelect`**: Creates a derived store (read-only). Hooks accept both `VanillaStore` and `VanillaSelect` — TypeScript overloads enforce that `set` is `never` for selects.

## Public API

```ts
// Core
createVanillaStore(initialState, equalityFn?, options?)

// React hooks
useStore(store, initialValue?)          // [value, set]
useGetStore(store, initialValue?)       // value only
useSetStore(store, initialValue?)       // set only
useStoreSelector(store, selector, options?)  // [selectedValue, set]

// Derived store
createVanillaSelect(store, selector)

// Persistence
new LocalStoragePersist(key, initialValue, typeAssertion)
new SessionStoragePersist(key, initialValue, typeAssertion)
```

## Tests

Tests are colocated in `src/` (`store.test.ts`, `react.test.ts`, `select.test.ts`), using vitest + happy-dom.
