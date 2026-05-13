# CLAUDE.md — @naverpay/url-param-compressor

Compresses URL query parameters using deflate (fflate) + URL-safe base64 encoding. Runs in both Node and browser environments.

## Commands

```bash
pnpm test            # runs both node and browser tests
pnpm run test:node   # vitest only
pnpm run test:browser # playwright only
pnpm bench           # vitest benchmark
pnpm build           # CJS + ESM
```

## Structure

```
src/
  URLParamCompressor.ts       # main class
  URLParamCompressor.test.ts  # vitest unit tests
  URLParamCompressor.bench.ts # benchmark
  utils/
    LRUCache.ts               # in-memory cache for decompress results
  index.ts
```

## How It Works

`URLParamCompressor` is a class with three methods:

- **`compress(urlObj)`** — serializes `Record<string, string>` via `URLSearchParams`, compresses with `deflateSync`, encodes to URL-safe base64. If compressed is _larger_ than original, returns the uncompressed string.
  - Returns `{ result: string, isCompressed: boolean }`

- **`decompress(compressed)`** — reverses compress. Caches result in `LRUCache`. Returns `null` on failure.

- **`get(compressed, key)`** — extracts a single key from a compressed string, using cache to avoid re-decompressing.

## Constructor Options

```ts
new URLParamCompressor({
  cacheCapacity?: number  // default 100
  debug?: boolean         // logs compression ratio or skip reason
  deflateOptions?: { level?, mem?, dictionary? }
})
```

## Key Details

- Uses `Buffer` in Node, `btoa`/`atob` in browser — both paths are handled internally.
- URL-safe base64: `+` → `-`, `/` → `_`, trailing `=` removed.
- The `LRUCache` prevents repeated decompression of the same string.
- Playwright tests verify browser environment compatibility.
