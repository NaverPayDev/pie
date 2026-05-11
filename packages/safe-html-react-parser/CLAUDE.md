# CLAUDE.md — @naverpay/safe-html-react-parser

Wraps `html-react-parser` with `isomorphic-dompurify` to sanitize HTML before parsing into React elements. Works in both SSR (Node) and browser environments.

## Commands

```bash
pnpm run test:memory   # vitest run (no watch)
pnpm build             # CJS + ESM
```

## Structure

```
src/
  index.ts             # safeParse(), SafeParseOptions, DEFAULT_SANITIZE_CONFIG
  utils/
    dompurify.ts       # thin wrapper around isomorphic-dompurify
```

## Public API

```ts
safeParse(htmlString: string, options?: SafeParseOptions): ReactNode | null
```

`SafeParseOptions` extends `HTMLReactParserOptions` with:

- `sanitizeConfig?: SanitizeConfig` — DOMPurify config (defaults to `DEFAULT_SANITIZE_CONFIG`)
- `preserveCustomTags?: string[]` — custom elements to preserve through sanitization

`DEFAULT_SANITIZE_CONFIG` allows: `p br strong em b i u span div h1-h6 h ul ol li dl dt dd a img` with `KEEP_CONTENT: true`.

## Key Design Decisions

**CJS/ESM interop quirk**: `html-react-parser` re-exports its CJS default in a non-standard way. The actual parse function is resolved as:

```ts
htmlReactParser.default?.default || htmlReactParser.default || htmlReactParser
```

Do not change this without verifying both CJS and ESM builds.

**Custom tag preservation**: DOMPurify strips unknown tags. To preserve custom tags, `preserveCustomTags` temporarily converts them to `<span data-custom-tag="...">` before sanitization, then restores them via the `replace` option in `html-react-parser`.

**Returns `null`** if the sanitized HTML is empty/falsy.
