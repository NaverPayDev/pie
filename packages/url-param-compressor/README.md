# @naverpay/url-param-compressor

`@naverpay/url-param-compressor`는 내부적으로 [fflate](https://www.npmjs.com/package/fflate) 라이브러리를 활용하여 URL 매개변수를 압축하고 해제하는 유틸리티 패키지입니다. URL의 길이를 효율적으로 관리하면서도 필요한 모든 정보를 전달할 수 있습니다.

## How it works

`@naverpay/url-param-compressor`는 `fflate`의 [`deflateSync`](https://github.com/101arrowz/fflate/blob/master/docs/README.md#deflatesync) 함수로 압축을 수행하며, Huffman Coding와 LZ77 알고리즘을 활용합니다.

LZ77은 중복되는 문자를 앞서 등장했던 위치를 참조하는 방식으로 바꿉니다.
Huffman Coding은 출현 빈도가 높은 데이터는 짧은 비트로, 빈도가 낮은 데이터는 긴 비트로 표현하여 전체 데이터를 압축하는 인코딩 방식입니다. deflate는 LZ77이 적용된 값을 다시 Huffman Code로 압축을 하게 됩니다.

`deflateSync`는 Uint8Array 타입의 데이터를 인자로 받고 리턴하기 때문에 `@naverpay/url-param-compressor` 내부에서 string을 Uint8Array로 인코딩하고, Uint8Array를 string으로 디코딩하는 과정을 수행합니다.

- 참고: <https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad>

## Playground

<https://naverpaydev.github.io/pie/playground/@naverpay/url-param-compressor>

## Features

- URL 매개변수 압축/해제
- LRU 캐시를 통한 성능 최적화
- Base64 URL-safe 인코딩 지원
- Node.js와 브라우저 환경 모두 지원
- 압축 결과가 원본보다 용량이 큰 경우 자동 스킵

## Installation

```bash
npm install @naverpay/url-param-compressor
# or
yarn add @naverpay/url-param-compressor
# or
pnpm add @naverpay/url-param-compressor
```

## 사용법

### 기본 사용

```typescript
import {URLParamCompressor} from '@naverpay/url-param-compressor'

const compressor = new URLParamCompressor()

// 압축
const params = {
    userId: '12345',
    userName: 'John Doe',
    userEmail: 'john@example.com'
}

const {result, isCompressed} = compressor.compress(params)
console.log(result) // 압축된 문자열(URL-safe base64 처리된) 또는 원본 문자열(압축 결과가 원본보다 긴 경우)
console.log(isCompressed) // 압축 여부

// 해제
const decompressed = compressor.decompress(result)
console.log(decompressed) // 원본 매개변수 객체
```

### 옵션 설정

```typescript
const compressor = new URLParamCompressor({
    cacheCapacity: 100, // LRU 캐시 용량 (기본값: 100)
    debug: true, // 디버깅 로그 활성화
    deflateOptions: {
        level: 6 // 압축 레벨 (1-9, 기본값: 6)
    }
})
```

### 개별 매개변수 조회

```typescript
// 압축된 문자열에서 특정 키의 값을 바로 조회
const value = compressor.get(compressedString, 'userId')
```

## Benchmark

Performance Benchmark on Extremely Long Parameters
(⚠️ Benchmark results may differ depending on how repetitive, nested, or complex the URL parameters are.)

| Method | Length(char) | Mean(s) | Compression Ratio (%) |
|:--------:|:--------------:|:---------:|:------------:|
| compress | ~5000 | 0.0914  | 16.24 |
| compress | ~10000 | 0.1324  | 8.91 |
| compress | ~50000 | 0.5187  | 2.28 |
| decompress |  ~5000 | 0.0645 | |
| decompress | ~10000 | 0.0817 | |
| decompress | ~50000 | 0.2431 | |
