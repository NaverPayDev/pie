# @naverpay/react-pdf

- 리액트 컴포넌트 기반으로 만들어진 pdf 뷰어 입니다. 별다른 설정 없이, PDF Viewer를 사용할 수 있습니다.

## Installation

```sh
npm install @naverpay/react-pdf
```

## Description

- [PdfViewer 설명 보기](https://github.com/NaverPayDev/pie/blob/main/packages/react-pdf/PdfViewer.md)
- [getPdfDocument 설명 보기](https://github.com/NaverPayDev/pie/blob/main/packages/react-pdf/getPdfDocument.md)

## @naverpay/react-pdf 의 장점

> 자세한 개선사항은 [**여기**](https://github.com/NaverPayDev/pie/blob/main/packages/react-pdf/개선사항.md) 에서 확인할 수 있습니다.

### 성능 향상

1. 한글을 고려한 렌더링 방식
      - [기존 react pdf](https://github.com/wojtekmaj/react-pdf) 는 파싱 및 렌더링이 영어에 초점이 맞춰져 있습니다.
      - 한글의 경우, 한글자 씩 렌더링되고 있어, rendering 시점에 blocking이 자주 발생되곤 했습니다.
      - `@naverpay/react-pdf` 에서는 한글에 알맞도록 파싱 로직을 수정했습니다.

2. non-blocking rendering
     - pdf rendering 시, requestAnimationFrame을 이용해 rendering에 의한 blocking이 발생되지 않도록 처리했습니다.

3. lazy loading
     - 페이지 수가 많은 pdf를 불러오고 rendering을 하게 되면, 부하가 많이 생기는데, 이를 lazy-loading을 기본적으로 적용하여 최적화했습니다.

### SSR 지원 (feat. Next.Js)

- 별도의 설정 없이, SSR을 지원하도록 구현했습니다.

### 기타 장점

- pdf 내부의 한글 글자 클릭 시, custom 한 action을 사용할 수 있도록 추가했습니다.
