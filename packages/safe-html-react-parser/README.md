# safe-html-react-parser

A secure wrapper for **html-react-parser** with **DOMPurify** that automatically sanitizes HTML before parsing.

## What it does

- 🛡️ **Security**: Automatically sanitizes malicious HTML using DOMPurify
- ⚛️ **React**: Seamlessly integrates with html-react-parser
- 🌐 **Universal**: Works in both browser and Node.js (SSR) environments
- 🏷️ **Custom Tags**: Handles project-specific tags like `<custom>` safely
- 🚀 **Flexible**: Choose your DOM implementation (jsdom, happy-dom, or linkedom)
- ⚡ **Optimized**: Built-in caching and memory management

## Installation

```bash
npm install @naverpay/safe-html-react-parser
```

### Choosing a DOM Implementation (Server-Side Only)

For server-side rendering, you need to install one of the following DOM implementations:

```bash
# Option 1: jsdom (most complete, heavier)
npm install jsdom

# Option 2: happy-dom (faster, lighter, recommended)
npm install happy-dom

# Option 3: linkedom (fastest, lightest)
npm install linkedom
```

The library will automatically detect and use the first available implementation in this order: jsdom → happy-dom → linkedom.

## Basic Usage

```tsx
import { safeParse } from '@naverpay/safe-html-react-parser'

// Basic usage - automatically sanitizes dangerous HTML
const Component = () => {
  const maliciousHtml = '<p>Hello <script>alert("XSS")</script>World</p>'
  return <div>{safeParse(maliciousHtml)}</div>
}
// Result: <div><p>Hello World</p></div>
```

## API

### `safeParse(htmlString, options?)`

Parses HTML string into React elements with automatic XSS protection.

#### Parameters

- `htmlString` (string): The HTML string to parse
- `options` (SafeParseOptions, optional): Configuration options

#### Options

```typescript
interface SafeParseOptions extends HTMLReactParserOptions {
  // DOMPurify configuration
  sanitizeConfig?: DOMPurify.Config
  
  // Custom tags to preserve during sanitization
  preserveCustomTags?: string[]
}
```

#### Returns

React elements or array of React elements

## Advanced Usage

### Custom Sanitization Config

```tsx
import { safeParse } from '@naverpay/safe-html-react-parser'

const html = '<div class="content"><style>body{color:red}</style><p>Text</p></div>'

const result = safeParse(html, {
  sanitizeConfig: {
    ALLOWED_TAGS: ['div', 'p', 'style'], // Allow style tags
    ALLOWED_ATTR: ['class'],
    ALLOW_ARIA_ATTR: true
  }
})
```

### Preserving Custom Tags

Use `preserveCustomTags` to preserve project-specific tags that would otherwise be removed:

```tsx
import { safeParse } from '@naverpay/safe-html-react-parser'

// Preserve custom tags like <g>, <path>, etc.
const svgContent = '<g><path d="M10,10 L20,20"/></g>'

const result = safeParse(svgContent, {
  preserveCustomTags: ['g', 'path'],
  replace: (domNode) => {
    if (domNode.name === 'g') {
      return <g {...domNode.attribs}>{/* custom rendering */}</g>
    }
    if (domNode.name === 'path') {
      return <path {...domNode.attribs} />
    }
  }
})
```

### Using with html-react-parser Options

All html-react-parser options are supported:

```tsx
import { safeParse } from '@naverpay/safe-html-react-parser'

const html = '<div id="content"><p>Hello</p><img src="image.jpg" alt="test"/></div>'

const result = safeParse(html, {
  replace: (domNode) => {
    if (domNode.name === 'img') {
      return <img {...domNode.attribs} loading="lazy" />
    }
  },
  trim: true
})
```

### Configuring DOM Implementation (Server-Side)

You have two ways to configure the DOM implementation:

#### Method 1: Per-call configuration (Recommended)

Pass `domPurifyOptions` directly to `safeParse()`:

```tsx
import { safeParse } from '@naverpay/safe-html-react-parser'
import { Window } from 'happy-dom'

const result = safeParse(htmlString, {
  domPurifyOptions: {
    domWindowFactory: () => new Window(),
    enableCache: true,
    maxCacheSize: 100
  }
})
```

#### Method 2: Global configuration

Configure once at app initialization:

```tsx
import { configureDOMPurify } from '@naverpay/safe-html-react-parser'

// Using jsdom
import { JSDOM } from 'jsdom'
configureDOMPurify({
  domWindowFactory: () => new JSDOM('<!DOCTYPE html>'),
  enableCache: true,
  maxCacheSize: 100,
  recreateInterval: 1000 // Recreate DOM instance every 1000 sanitizations
})

// Using happy-dom (recommended for better performance)
import { Window } from 'happy-dom'
configureDOMPurify({
  domWindowFactory: () => new Window(),
  enableCache: true,
  recreateInterval: 500
})

// Using linkedom (fastest, minimal footprint)
import { parseHTML } from 'linkedom'
configureDOMPurify({
  domWindowFactory: () => parseHTML('<!DOCTYPE html>'),
  enableCache: true
})
```

> [!NOTE]
>
> If you don't configure anything, the library will automatically try jsdom → happy-dom → linkedom in that order.

## Default Allowed Tags

By default, the following HTML tags are allowed:

```typescript
ALLOWED_TAGS: [
  'p', 'br', 'strong', 'em', 'b', 'i', 'u', 'span', 'div',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h',
  'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'a', 'img'
]
```

## Performance Optimization

### Caching

By default, caching is enabled to improve performance:

```tsx
configureDOMPurify({
  enableCache: true,      // Default: true
  maxCacheSize: 100,      // Default: 100
})
```

### Memory Management

The DOM instance is automatically recreated periodically to prevent memory leaks:

```tsx
configureDOMPurify({
  recreateInterval: 1000  // Default: 1000 sanitization calls
})
```

### DOM Implementation Comparison

| Implementation | Speed | Memory | Completeness | Recommended For |
|----------------|-------|--------|--------------|-----------------|
| **jsdom** | Slower | Higher | Most complete | Maximum compatibility |
| **happy-dom** | Fast | Medium | Good | **Balanced (Recommended)** |
| **linkedom** | Fastest | Lowest | Basic | Performance-critical apps |

## Security Notes

- All HTML is sanitized by DOMPurify before parsing
- Dangerous tags like `<script>`, `<iframe>`, `<object>` are automatically removed
- Event handlers like `onclick`, `onload` are stripped out
- Only safe attributes are preserved by default

## Built with

- [html-react-parser@^5.2.7](https://github.com/remarkablemark/html-react-parser) - HTML string to React element parser
- [dompurify@^3.3.0](https://github.com/cure53/DOMPurify) - XSS sanitizer
- Optional: [jsdom](https://github.com/jsdom/jsdom), [happy-dom](https://github.com/capricorn86/happy-dom), or [linkedom](https://github.com/WebReflection/linkedom)

## License

MIT
