# CLAUDE.md — @naverpay/utils

JavaScript/TypeScript utility library for Naver Financial frontend teams.

## Commands

```bash
# Run all tests (watch=false)
pnpm test

# Build (CJS + ESM via vite)
pnpm build
```

## Structure

```
src/
  index.ts          # re-exports everything
  utils/            # one file per utility
  constants/
    hangul.ts       # Korean character constants
__tests__/          # test files mirror utils/ names
```

## Exported Utilities

**Number / String Formatting**

- `formatNumberWithComma` — adds thousand separators
- `formatTenThousandUnitsAmount` — Korean 만(萬) unit formatting
- `createNumberFormatter` — factory for locale-aware number formatters
- `formatKoreanPhoneNumber` — formats raw digits to `010-XXXX-XXXX`
- `formatBusinessRegistrationNumber` — formats to `XXX-XX-XXXXX`

**Masking**

- `maskString`, `maskEmail`, `maskPhoneNumber`, `maskAccountNumber`, `maskCardNumber`, `maskPassportNumber`

**Korean Language**

- `get조사`, `with조사` — attaches Korean postpositions (은/는, 이/가, etc.)
- `getKoreanWithSuffix` — appends Korean suffix based on final consonant
- `마지막_문자_받침_여부` — checks if last character has a final consonant (받침)
- `한글_여부` — checks if a character is Korean
- `disassemble문자` — decomposes Korean characters into jamo

**Validation**

- `isValidKoreanPhoneNumber`, `isValidBusinessRegistrationNumber`

**Async / Performance**

- `debounce`, `throttle`, `sleep`
- `DeferredPromise` — exposes `resolve`/`reject` externally

**Misc**

- `isEmpty` — null/undefined/empty string/array/object check
- `deepMerge` — deep object merge
- `createKeyValuePairObject` — creates typed key-value pair objects
- `createSeededRandom` — deterministic pseudo-random number generator
- `getSecureMathRandom` — `crypto.getRandomValues`-based random (browser/server split)
- `generateRandomString`, `getRandomNumber`
- `encodeHTMLEntity` — HTML entity encoding
- `replaceNoBreakSpace` — replaces `\u00A0` with normal space
- `backOrClose` — browser back or window close

## Conventions

- Each utility lives in its own file under `src/utils/`. Do not merge unrelated utilities.
- Korean-named files (e.g., `한글_여부.ts`) are intentional — keep the naming.
- `getSecureMathRandom` has a `browser.ts` / `server.ts` split; the entry resolves via vite build conditions.
- Tests live in `__tests__/`, using vitest + happy-dom environment.
