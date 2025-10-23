# safe-html-react-parser

A secure wrapper for **html-react-parser** with **isomorphic-dompurify** that automatically sanitizes HTML before parsing.

## What it does

- 🛡️ **Security**: Automatically sanitizes malicious HTML using DOMPurify
- ⚛️ **React**: Seamlessly integrates with html-react-parser
- 🌐 **Universal**: Works in both browser and Node.js (SSR) environments
- 🏷️ **Custom Tags**: Handles project-specific tags like `<custom>` safely

## Installation

```bash
npm install @naverpay/safe-html-react-parser
```

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

## Security Notes

- All HTML is sanitized by DOMPurify before parsing
- Dangerous tags like `<script>`, `<iframe>`, `<object>` are automatically removed
- Event handlers like `onclick`, `onload` are stripped out
- Only safe attributes are preserved by default

## Built with

- [html-react-parser@^5.2.7](https://github.com/remarkablemark/html-react-parser) - HTML string to React element parser
- [isomorphic-dompurify@^2.30.1](https://github.com/kkomelin/isomorphic-dompurify) - Universal XSS sanitizer

## License

MIT
