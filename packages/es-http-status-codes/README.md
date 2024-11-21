# @naverpay/es-http-status-codes

A lightweight, efficient, and tree-shakable utility for working with HTTP status codes in TypeScript/JavaScript projects. Inspired by the popular [http-status-codes](https://github.com/prettymuchbryce/http-status-codes) package, this utility offers optimized features for modern development practices.

## Features

- **Complete HTTP Status Code Coverage**: Includes all standard HTTP status codes and their corresponding reason phrases.
- **Auto-generated Code**: All code is automatically generated from a single source of truth, ensuring consistency and ease of maintenance.
- **ESM Support**: Fully supports ECMAScript modules (ESM) for modern JavaScript environments.
- **Highly Tree-Shakable**: Uses plain objects instead of enums, allowing for superior tree-shaking capabilities.
- **TypeScript Ready**: Written in TypeScript, providing excellent type support out of the box.

## Comparison

> build with Next.js

### `http-status-codes`

```js
import { StatusCodes } from "http-status-codes";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log(StatusCodes.NOT_FOUND);
  });
  return (
    <>
      <>Hello {StatusCodes.OK}</>
    </>
  );
}
```

```js
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [330], {
        3801: (E, T, _) => {
            (window.__NEXT_P = window.__NEXT_P || []).push(["/b", function() {
                return _(1625)
            }])
        },
        1625: (E, T, _) => {
            "use strict";
            _.r(T), _.d(T, {
                default: () => I
            });
            var O, R = _(4584);
            ! function(E) {
                E[E.CONTINUE = 100] = "CONTINUE", E[E.SWITCHING_PROTOCOLS = 101] = "SWITCHING_PROTOCOLS", E[E.PROCESSING = 102] = "PROCESSING", E[E.EARLY_HINTS = 103] = "EARLY_HINTS", E[E.OK = 200] = "OK", E[E.CREATED = 201] = "CREATED", E[E.ACCEPTED = 202] = "ACCEPTED", E[E.NON_AUTHORITATIVE_INFORMATION = 203] = "NON_AUTHORITATIVE_INFORMATION", E[E.NO_CONTENT = 204] = "NO_CONTENT", E[E.RESET_CONTENT = 205] = "RESET_CONTENT", E[E.PARTIAL_CONTENT = 206] = "PARTIAL_CONTENT", E[E.MULTI_STATUS = 207] = "MULTI_STATUS", E[E.MULTIPLE_CHOICES = 300] = "MULTIPLE_CHOICES", E[E.MOVED_PERMANENTLY = 301] = "MOVED_PERMANENTLY", E[E.MOVED_TEMPORARILY = 302] = "MOVED_TEMPORARILY", E[E.SEE_OTHER = 303] = "SEE_OTHER", E[E.NOT_MODIFIED = 304] = "NOT_MODIFIED", E[E.USE_PROXY = 305] = "USE_PROXY", E[E.TEMPORARY_REDIRECT = 307] = "TEMPORARY_REDIRECT", E[E.PERMANENT_REDIRECT = 308] = "PERMANENT_REDIRECT", E[E.BAD_REQUEST = 400] = "BAD_REQUEST", E[E.UNAUTHORIZED = 401] = "UNAUTHORIZED", E[E.PAYMENT_REQUIRED = 402] = "PAYMENT_REQUIRED", E[E.FORBIDDEN = 403] = "FORBIDDEN", E[E.NOT_FOUND = 404] = "NOT_FOUND", E[E.METHOD_NOT_ALLOWED = 405] = "METHOD_NOT_ALLOWED", E[E.NOT_ACCEPTABLE = 406] = "NOT_ACCEPTABLE", E[E.PROXY_AUTHENTICATION_REQUIRED = 407] = "PROXY_AUTHENTICATION_REQUIRED", E[E.REQUEST_TIMEOUT = 408] = "REQUEST_TIMEOUT", E[E.CONFLICT = 409] = "CONFLICT", E[E.GONE = 410] = "GONE", E[E.LENGTH_REQUIRED = 411] = "LENGTH_REQUIRED", E[E.PRECONDITION_FAILED = 412] = "PRECONDITION_FAILED", E[E.REQUEST_TOO_LONG = 413] = "REQUEST_TOO_LONG", E[E.REQUEST_URI_TOO_LONG = 414] = "REQUEST_URI_TOO_LONG", E[E.UNSUPPORTED_MEDIA_TYPE = 415] = "UNSUPPORTED_MEDIA_TYPE", E[E.REQUESTED_RANGE_NOT_SATISFIABLE = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE", E[E.EXPECTATION_FAILED = 417] = "EXPECTATION_FAILED", E[E.IM_A_TEAPOT = 418] = "IM_A_TEAPOT", E[E.INSUFFICIENT_SPACE_ON_RESOURCE = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE", E[E.METHOD_FAILURE = 420] = "METHOD_FAILURE", E[E.MISDIRECTED_REQUEST = 421] = "MISDIRECTED_REQUEST", E[E.UNPROCESSABLE_ENTITY = 422] = "UNPROCESSABLE_ENTITY", E[E.LOCKED = 423] = "LOCKED", E[E.FAILED_DEPENDENCY = 424] = "FAILED_DEPENDENCY", E[E.UPGRADE_REQUIRED = 426] = "UPGRADE_REQUIRED", E[E.PRECONDITION_REQUIRED = 428] = "PRECONDITION_REQUIRED", E[E.TOO_MANY_REQUESTS = 429] = "TOO_MANY_REQUESTS", E[E.REQUEST_HEADER_FIELDS_TOO_LARGE = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE", E[E.UNAVAILABLE_FOR_LEGAL_REASONS = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS", E[E.INTERNAL_SERVER_ERROR = 500] = "INTERNAL_SERVER_ERROR", E[E.NOT_IMPLEMENTED = 501] = "NOT_IMPLEMENTED", E[E.BAD_GATEWAY = 502] = "BAD_GATEWAY", E[E.SERVICE_UNAVAILABLE = 503] = "SERVICE_UNAVAILABLE", E[E.GATEWAY_TIMEOUT = 504] = "GATEWAY_TIMEOUT", E[E.HTTP_VERSION_NOT_SUPPORTED = 505] = "HTTP_VERSION_NOT_SUPPORTED", E[E.INSUFFICIENT_STORAGE = 507] = "INSUFFICIENT_STORAGE", E[E.NETWORK_AUTHENTICATION_REQUIRED = 511] = "NETWORK_AUTHENTICATION_REQUIRED"
            }(O || (O = {}));
            var N = _(3732);

            function I() {
                return (0, N.useEffect)(() => {
                    console.log(O.NOT_FOUND)
                }), (0, R.jsx)(R.Fragment, {
                    children: (0, R.jsxs)(R.Fragment, {
                        children: ["Hello ", O.OK]
                    })
                })
            }
        }
    },
    E => {
        var T = T => E(E.s = T);
        E.O(0, [636, 593, 792], () => T(3801)), _N_E = E.O()
    }
]);
```

> 3116 bytes

### `@naverpay/es-http-status-codes`

```js
import { HttpStatusCodes as StatusCodes } from "@naverpay/es-http-status-codes";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log(StatusCodes.NOT_FOUND);
  });
  return (
    <>
      <>Hello {StatusCodes.OK}</>
    </>
  );
}
```

```js
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [521], {
        9009: (e, n, _) => {
            (window.__NEXT_P = window.__NEXT_P || []).push(["/a", function() {
                return _(5406)
            }])
        },
        5406: (e, n, _) => {
            "use strict";
            _.r(n), _.d(n, {
                default: () => u
            });
            var r = _(4584);
            let s = {
                OK: 200,
                NOT_FOUND: 404
            };
            var t = _(3732);

            function u() {
                return (0, t.useEffect)(() => {
                    console.log(s.NOT_FOUND)
                }), (0, r.jsx)(r.Fragment, {
                    children: (0, r.jsxs)(r.Fragment, {
                        children: ["Hello ", s.OK]
                    })
                })
            }
        }
    },
    e => {
        var n = n => e(e.s = n);
        e.O(0, [636, 593, 792], () => n(9009)), _N_E = e.O()
    }
]);
```

> 494 bytes

## Installation

```bash
npm install @naverpay/es-http-status-codes
```

## Usage

```ts
import { HttpStatusCodes, ReasonPhrases } from '@naverpay/es-http-status-codes';

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
