# @naverpay/url-param-compressor

`@naverpay/url-param-compressor`는 내부적으로 [fflate](https://www.npmjs.com/package/fflate) 라이브러리를 활용하여 URL 매개변수를 압축하고 해제하는 유틸리티 패키지입니다. URL의 길이를 효율적으로 관리하면서도 필요한 모든 정보를 전달할 수 있습니다.

## Playground

<https://naverpaydev.github.io/pie/playground/@naverpay/url-param-compressor>

## Features

- URL 매개변수 압축/해제
- LRU 캐시를 통한 성능 최적화
- Base64 URL-safe 인코딩 지원
- Node.js와 브라우저 환경 모두 지원
- 작은 용량으로 압축이 효과적이지 않을 경우 자동 스킵

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
console.log(result) // 압축된 문자열 또는 원본 문자열(압축이 효과적이지 않은 경우)
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
