# CLAUDE.md — @naverpay/svg-manager

React utility for making SVG `id` attributes unique across multiple instances of the same SVG component.

## Commands

```bash
pnpm test    # vitest, watch=false
pnpm build   # CJS + ESM
```

## Structure

```
src/
  SvgUniqueID.tsx     # main component ('use client')
  index.ts            # exports: SvgUniqueID, SVGStyleProps
  utils/
    deepMap.ts        # recursive React children traversal
    toSafeId.ts       # id → CSS/url-safe token
  types/
    svg.ts            # SVGStyleProps type
    utility-types.ts
```

## How It Works

`SvgUniqueID` wraps SVG children and rewrites all `id`, `url(#...)`, and `xlinkHref="#..."` references to scoped unique values of the form `${prefixId}${instanceId}__${toSafeId(originalId)}__`.

- `instanceId` comes from React `useId()` (normalized to a CSS/url-safe token via `toSafeId`), so it is stable across renders and identical on server and client (hydration-safe). An explicit `id` prop overrides it.
- A pure `renameId()` maps each original id to the same scoped value wherever it appears, keeping a definition (`id="x"`) and every reference (`url(#x)`, `xlinkHref="#x"`) in sync. Selector-unsafe characters are normalized to `_`.
- `rewrite()` scopes each prop by name: `id` (whole value), `xlinkHref` (`#id`), and every other prop (`url(#id)`).
- Recursively traverses children with `deepMap` (custom recursive `cloneElement`).
- Declares `'use client'` because it uses hooks (`useId`); it runs as a Client Component in RSC/App Router environments.

## Props

```tsx
<SvgUniqueID
  prefixId="__SVG_ID__"   // prefix for generated scoped IDs (default)
  id="my-instance"        // optional explicit instance id; auto-generated (hydration-safe) when omitted
>
  {/* SVG content with id/url(#...)/xlinkHref attributes */}
</SvgUniqueID>
```

## Tests

Tests are colocated in `src/` (`SvgUniqueID.test.tsx`, `utils/toSafeId.test.ts`), using vitest in the default node environment — `renderToStaticMarkup` needs no DOM. `vitest.config.mts` exists only to keep vitest from loading `vite.config.mjs` (the pite build config). The component is tested via `renderToStaticMarkup` — asserting scoped-id output, reference/definition integrity (no dangling `url(#...)`), and SSR render determinism (hydration-safety).
