# CLAUDE.md — @naverpay/es-http-status-codes

Auto-generated, tree-shakable HTTP status code constants and reason phrases for TypeScript/JavaScript.

## Commands

```bash
pnpm generate   # regenerate src/ from data.json
pnpm test       # jest + ts-jest
pnpm build      # CJS + ESM
```

## Structure

```
data.json                 # source of truth — list of { code, phrase, constant }
script/index.js           # code generator: reads data.json → writes src/
src/
  status-code.ts          # AUTO-GENERATED: HttpStatusCodes, HttpStatusCode, HttpStatusCodeKeys
  reason-phrase.ts        # AUTO-GENERATED: ReasonPhrases
  index.ts                # re-exports both
__tests__/
  index.test.ts           # jest tests
```

## Key Rule

**Never edit `src/status-code.ts` or `src/reason-phrase.ts` directly.** They are auto-generated with the header comment `/*This file is auto-generated. Do not edit directly.*/`.

To add or change HTTP status codes, edit `data.json` and run `pnpm generate`.

## Public API

```ts
import { HttpStatusCodes, ReasonPhrases } from '@naverpay/es-http-status-codes'

HttpStatusCodes.OK           // 200
HttpStatusCodes.NOT_FOUND    // 404
ReasonPhrases[200]           // "OK"

// Types
type HttpStatusCode     // union of all numeric codes
type HttpStatusCodeKey  // union of all constant name strings
HttpStatusCodeKeys      // string[] of all constant names
```
