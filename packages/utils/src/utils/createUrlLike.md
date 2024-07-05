# createUrlLike

`URL` 클래스를 지원하지 않는 환경(IE11 등)까지 고려해야 할 때 사용하는 함수로,
환경에 따라 `URL`, `HTMLAnchorElement` 순서의 우선순위로 인스턴스를 생성합니다.

환경에 무관하게 보장하는 property는 `URL` 클래스 기준으로 `searchParams`를 제외한 나머지입니다.

- `hash`
- `host`
- `href`
- `origin`
- `password`
- `pathname`
- `port`
- `protocol`
- `search`
- `username`

`URL` 클래스 미지원 환경에서는 내부적으로 빈 `Document`를 기반으로 `HTMLBaseElement`, `HTMLAnchorElement` 조합을 사용합니다.

## 스펙 링크

- <https://developer.mozilla.org/en-US/docs/Web/API/URL>
- <https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement>

## 사용 예제

```typescript
import {createUrlLike} from '@naverpay/utils'

const urlLike = createUrlLike('/path?query1=abc&query2=123#hash', 'https://new-m.pay.naver.com')
const {
    pathname, // '/path'
    search, // '?query1=abc&query2=123'
    hash, // '#anchor'
} = urlLike
```
