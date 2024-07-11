# @naverpay/http-status-codes

A lightweight, efficient, and tree-shakable utility for working with HTTP status codes in TypeScript/JavaScript projects. Inspired by the popular [http-status-codes](https://github.com/prettymuchbryce/http-status-codes) package, this utility offers optimized features for modern development practices.

## Features

- **Complete HTTP Status Code Coverage**: Includes all standard HTTP status codes and their corresponding reason phrases.
- **Auto-generated Code**: All code is automatically generated from a single source of truth, ensuring consistency and ease of maintenance.
- **ESM Support**: Fully supports ECMAScript modules (ESM) for modern JavaScript environments.
- **Highly Tree-Shakable**: Uses plain objects instead of enums, allowing for superior tree-shaking capabilities.
- **TypeScript Ready**: Written in TypeScript, providing excellent type support out of the box.

## Installation

```bash
npm install @naverpay/http-status-codes
```

## Usage

```ts
import { HttpStatusCodes, ReasonPhrases } from '@naverpay/http-status-codes';

console.log(HttpStatusCodes.OK); // 200
console.log(ReasonPhrases[HttpStatusCodes.OK]); // "OK"
```

## API

- `HttpStatusCodes`: An object containing all HTTP status codes as constants.
- `ReasonPhrases`: An object mapping status codes to their corresponding reason phrases.

## Development

This project uses an automated script to generate its core files. To regenerate the files after making changes to the source data:

```bash
npm run generate
```

## Inspiration

This project draws inspiration from the [http-status-codes](https://github.com/prettymuchbryce/http-status-codes) package, aiming to provide a similar utility with enhanced features and modern JavaScript support.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
