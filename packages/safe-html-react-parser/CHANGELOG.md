# @naverpay/safe-html-react-parser

## 2.0.0

### Major Changes

-   7b7de6c: [safe-html-react-parser] isomorphic-dompurify로 마이그레이션

    업스트림 메모리 누수 이슈([kkomelin/isomorphic-dompurify#368](https://github.com/kkomelin/isomorphic-dompurify/issues/368))를 우회하기 위해 도입했던 커스텀 DOMPurify 래퍼(jsdom/happy-dom/linkedom 중 선택 지원, LRU 캐시, recreate interval 등)를 제거하고, 누수가 해결된 `isomorphic-dompurify`를 직접 사용하도록 단순화합니다.

    **Breaking Changes**

    -   `configureDOMPurify` 함수 export 제거
    -   `SafeParseOptions.domPurifyOptions` 옵션 제거
    -   `DOMWindow`, `DOMWindowFactory`, `DOMPurifyOptions` 타입 export 제거
    -   `jsdom` / `happy-dom` / `linkedom` 피어 의존성 제거 (별도 설치 불필요)

    Issue: [#202](https://github.com/NaverPayDev/pie/issues/202)

## 1.1.0

### Minor Changes

-   3eea5d1: [safe-html-react-parser] Replace isomorphic-dompurify with custom implementation supporting flexible DOM libraries

    PR: [[safe-html-react-parser] Replace isomorphic-dompurify with custom implementation supporting flexible DOM libraries](https://github.com/NaverPayDev/pie/pull/203)

## 1.0.0

### Major Changes

-   65a2c81: Add a new package: safe-html-react-parser

    PR: [Add a new package: safe-html-react-parser](https://github.com/NaverPayDev/pie/pull/199)
