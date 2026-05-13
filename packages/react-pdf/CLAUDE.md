# CLAUDE.md — @naverpay/react-pdf

React PDF viewer built on `pdfjs-dist`, optimized for Korean documents. Exports CSS separately (`@naverpay/react-pdf/style.css`).

## Commands

```bash
pnpm build   # CJS + ESM (no tests in this package)
```

## Structure

```
src/
  index.ts                        # public exports
  components/
    PdfViewer.tsx                 # top-level component (entry point for consumers)
    Pages.tsx                     # renders all pages via IntersectionObserver
    page/
      Canvas.tsx                  # renders a single PDF page onto <canvas>
    layer/
      Text.tsx                    # text layer (enables text selection)
      Annotation.tsx              # annotation layer (links, etc.)
  contexts/
    pdf.tsx                       # PDFDocumentProxy + viewer config context
    page.tsx                      # per-page context
  hooks/
    useInfiniteScroll.ts          # IntersectionObserver-based lazy page loading
    useIsomorphicLayoutEffect.ts  # useLayoutEffect on client, useEffect on SSR
    usePdfViewerPageWidth.ts      # measures container width for responsive rendering
  utils/
    pdf.ts                        # getPdfDocument wrapper
    text.ts                       # text layer utilities
    link-service.ts               # external link handling for annotations
    debounce.ts                   # local debounce (not from @naverpay/utils)
```

## PdfViewer Props

Key props on `<PdfViewer>`:

- `pdfUrl` — required, URL of the PDF file
- `pdfWorkerSource` — path to `pdf.worker.js` (consumers must configure)
- `cMapUrl`, `cMapCompressed` — for older PDFs requiring cmap support (Korean fonts)
- `withCredentials` — passes cookies for authenticated PDF endpoints
- `lazyLoading` — default `true`, uses IntersectionObserver for deferred page rendering
- `onClickWords` — `{ target: string | RegExp, callback }[]` for clickable text
- `header`, `footer` — ReactNode rendered above/below the PDF pages
- `onLoadPDFRender`, `onErrorPDFRender` — load lifecycle callbacks
- `externalLinkTarget` — default `'_blank'`

## Key Details

- PDF fingerprint comparison prevents unnecessary re-renders when `pdfUrl` doesn't change.
- `tokenize` prop is automatically set to `true` when `onClickWords` is provided.
- Consumers must import `@naverpay/react-pdf/style.css` separately.
- No tests exist in this package currently.
