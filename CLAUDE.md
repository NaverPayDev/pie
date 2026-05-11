# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`pie` is a monorepo of common frontend libraries maintained by the Naver Financial frontend team. It uses pnpm workspaces + Turborepo, with packages under `packages/*` and internal apps under `apps/*`.

## Commands

```bash
# Install dependencies
pnpm install

# Build all packages (respects dependency order via Turborepo)
pnpm run build

# Run all tests
pnpm run test

# Filter to a specific package
pnpm run build --filter @naverpay/utils
pnpm run test --filter @naverpay/utils

# Run tests inside a package directly
cd packages/utils && pnpm test

# Lint / format
pnpm run lint
pnpm run lint:fix
pnpm run prettier
pnpm run prettier:fix

# Docs dev server
pnpm run start --filter docs

# Full clean + reinstall
pnpm run clean
```

## Packages

Each package has its own `CLAUDE.md` with detailed architecture and API notes:

| Package | Description | CLAUDE.md |
|---|---|---|
| `@naverpay/utils` | JS/TS utility functions (formatting, masking, Korean language) | [packages/utils/CLAUDE.md](packages/utils/CLAUDE.md) |
| `@naverpay/vanilla-store` | Framework-agnostic state management with React hooks | [packages/vanilla-store/CLAUDE.md](packages/vanilla-store/CLAUDE.md) |
| `@naverpay/url-param-compressor` | URL query param compression via deflate + base64 | [packages/url-param-compressor/CLAUDE.md](packages/url-param-compressor/CLAUDE.md) |
| `@naverpay/safe-html-react-parser` | DOMPurify + html-react-parser safe wrapper | [packages/safe-html-react-parser/CLAUDE.md](packages/safe-html-react-parser/CLAUDE.md) |
| `@naverpay/react-pdf` | Korean-optimized PDF viewer (pdfjs-dist) | [packages/react-pdf/CLAUDE.md](packages/react-pdf/CLAUDE.md) |
| `@naverpay/svg-manager` | SVG unique ID scoping for React | [packages/svg-manager/CLAUDE.md](packages/svg-manager/CLAUDE.md) |
| `@naverpay/es-http-status-codes` | Auto-generated HTTP status code constants | [packages/es-http-status-codes/CLAUDE.md](packages/es-http-status-codes/CLAUDE.md) |

## Architecture

### Build

All packages build with `@naverpay/pite` (`createViteConfig`) and output both CJS (`dist/cjs/`) and ESM (`dist/esm/`). Each package's `vite.config.mjs` declares the entry point(s).

### Testing

- Most packages: **vitest** + **happy-dom**
- `es-http-status-codes`: **jest** + **ts-jest**
- `url-param-compressor`: **vitest** (Node) + **playwright** (browser) — both run on `pnpm test`

### Versioning

Uses **changesets**. Before merging a PR, create a changeset file with `pnpm changeset`. Base branch is `main`. Internal dependency updates default to `patch`.

### Code Quality

Enforced via ESLint (`@naverpay/eslint-config`), Prettier (`@naverpay/prettier-config`), and markdownlint (`@naverpay/markdown-lint`). husky + lint-staged run checks on every commit.

## Conventions

- **No breaking changes**: Avoid changes that require consumers to update their code.
- **`sideEffects: false`**: All packages declare this — do not add side effects at module load time.
- **pnpm catalog**: React-related peer dependency versions are unified in `pnpm-workspace.yaml` under `catalog:`. Use `catalog:` instead of hardcoded version ranges.
- **Test file location**: `__tests__/` directory at package root (for `utils`, `es-http-status-codes`); colocated in `src/` for `vanilla-store` and `url-param-compressor`.
- **Auto-generated files**: `packages/es-http-status-codes/src/status-code.ts` and `reason-phrase.ts` are generated — never edit directly.
