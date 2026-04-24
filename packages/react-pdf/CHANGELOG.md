# @naverpay/react-pdf

## 1.1.2

### Patch Changes

-   fa2c74e: [react-pdf] a 태그 관련 수정

    PR: [[react-pdf] a 태그 관련 수정](https://github.com/NaverPayDev/pie/pull/219)

## 1.1.1

### Patch Changes

-   f64ab4f: pdfjs-dist의 버전을 최신화합니다

    PR: [pdfjs-dist의 버전을 최신화합니다](https://github.com/NaverPayDev/pie/pull/191)

## 1.1.0

### Minor Changes

-   f273b64: chore: unify peer dependency versions for consistency across the project

    PR: [chore: unify peer dependency versions for consistency across the project](https://github.com/NaverPayDev/pie/pull/148)

## 1.0.4

### Patch Changes

-   d9aabb6: [react-pdf] style export

    PR: [[react-pdf] style export ](https://github.com/NaverPayDev/pie/pull/146)

## 1.0.3

### Patch Changes

-   7336006: ✨ feat: add URL parsing polyfill to PdfViewer, AnnotationLayer, and pdf utilities

    PR: [✨ feat: add URL parsing polyfill to PdfViewer, AnnotationLayer, and pdf utilities](https://github.com/NaverPayDev/pie/pull/144)

## 1.0.2

### Patch Changes

-   51e853e: `legacy build`를 사용하도록 변경

    PR: [pdf 개선 작업](https://github.com/NaverPayDev/pie/pull/142)

## 1.0.1

### Patch Changes

-   8bbd752: [react-pdf] pdfjs dist에 export default 가 없어 생기는 빌드 에러를 해결합니다

    PR: [[react-pdf] pdfjs dist에 export default 가 없어 생기는 빌드 에러를 해결합니다](https://github.com/NaverPayDev/pie/pull/139)

## 1.0.0

### Major Changes

-   81d253a: ## [react-pdf] Drop Support for Internet Explorer

    ### Migrate to `pdfjs-dist` and Improve PDF Rendering

    -   Removed legacy `pdfjs-dist` and updated all components accordingly.
    -   Removed SVG rendering (previously an experimental feature).
    -   Added support for ESM modules.
    -   Updated worker settings to allow usage via CDN.

    PR: [[react-pdf] Drop Support for Internet Explorer](https://github.com/NaverPayDev/pie/pull/124)

### Patch Changes

-   42111e0: pite 2.0.0으로 pie를 빌드합니다

    PR: [pite 2.0.0으로 pie를 빌드합니다](https://github.com/NaverPayDev/pie/pull/134)

## 0.3.4

### Patch Changes

-   93127a8: [canvas를 그리는 도중 canvas를 또 그려야되는 상황이 되면, 이전 동작을 취소하고 다시 그립니다.](https://github.com/NaverPayDev/pie/pull/106)

## 0.3.3

### Patch Changes

-   4c31ef1: :bug: 누락된 withCredentials 옵션을 넘겨줍니다

## 0.3.2

### Patch Changes

-   8a8e197: [react-pdf] pdf viewer에 inline style을 주입할 수 있도록 props를 추가합니다

## 0.3.1

### Patch Changes

-   c36ed14: [react-pdf] pdf에 삽입된 스크립트를 실행하는 isEvalSupported 파라미터를 false로 변경합니다.

## 0.3.0

### Minor Changes

-   14999f5: [react pdf] pdf props 변경에 따라, 기존 pdf가 남아있지 않도록 수정합니다.

## 0.2.1

### Patch Changes

-   d71c52e: [react-pdf] 파일 이름 변경에 따른, 잘못된 scss import 를 수정합니다.

## 0.2.0

### Minor Changes

-   3929687: [react-pdf] pdf viewer 컴포넌트명 변경 및 오류를 수정합니다.

## 0.1.0

### Minor Changes

-   27ab462: [@naverpay/react-pdf] 제대로된 ssr 지원과 esm 지원을 드랍합니다.

## 0.0.3

### Patch Changes

-   5609ad7: - `@naverpay/rollup` jsx 기본 트랜스파일 값이 `classic`으로 변경됩니다.
    [rollup] babel decorator 지원 및 react runtime classic으로 고정

## 0.0.2

### Patch Changes

-   a532e38: [공통] README를 작성하고, @types 의존성을 패키지 내부 devDeps로 이동합니다

## 0.0.1

### Patch Changes

-   3e7c3d2: 🎉 naverpay에서 자체 제작한 react pdf 를 출시합니다.
