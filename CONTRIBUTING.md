# Contributing to NaverPay Common Packages

기여하는 코드의 크기에 상관없이, 어떤 종류의 기여든 모두 환영합니다. 본격적으로 코드에 기여하기에 앞서, 저희의 [기여자 행동 강령 규약](./CODE_OF_CONDUCT.md)을 읽어주시기 바랍니다.

## 어디서 부터 시작해야할지 모르겠다면

- 코드에 본격적으로 기여할 준비는 되어 있지 않지만, 버그나 이슈를 발견했다면 [이슈를 등록](https://github.com/NaverPayDev/pie/issues)해주세요. 적절한 레이블과 제목을 함께 작성해주시면, 담당자를 찾는데 큰 도움이 됩니다. 이슈가 오랜 기간 방치되어 있다면, [네이버 파이낸셜 공통개발 TF](nfn0000220@navercorp.com)로 메일 부탁드립니다.

## 개발

### 시스템 요구 사항

- node: node@18.12.0 버전. `node -v` 명령어로 확인하실 수 있습니다.
- pnpm: pnpm@8.6.6 버전. `pnpm -v` 명령어로 확인하실 수 있습니다.

### 개발

1. 프로젝트를 클론 및 패키지를 설치합니다.

    ```sh
    ~/workspace > git clone git@github.com:NaverPayDev/pie.git
    ~/workspace > cd pie
    ~/workspace/pie > pnpm install
    ```

2. 로컬환경에서 패키지를 빌드합니다.

    ```sh
    ~/workspace/pie > pnpm run build
    ```

### 제공하는 패키지

pie 는 아래와 같은 패키지를 제공하고 있습니다.

- [@naverpay/react-pdf](https://github.com/NaverPayDev/pie/tree/main/packages/react-pdf) : 한글에 적합한 PDF 뷰어를 제공합니다.
- [@naverpay/rollup](https://github.com/NaverPayDev/pie/tree/main/packages/rollup) : 쉽게 패키지 번들러를 생성할 수 있습니다.

## 버전 릴리즈

- 만약 버그로 인해 긴급한 수정이 필요하다면 당황하지 마시고 [네이버 파이낸셜 공통개발 TF](nfn0000220@navercorp.com)로 메일을 보내주세요. 최대한 빠른 배포를 지원해드리겠습니다.

## 주의 사항

- 라이브러리를 사용하는 쪽에서 변경이 필요한 이른바 breaking changes는 최대한 지양하고 있습니다. breaking changes가 없는지 반드시 확인해주세요.
