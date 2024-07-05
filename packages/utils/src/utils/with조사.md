# with조사

한글 단어의 마지막 단어에 따라 단어 + 조사를 반환합니다.

## 사용 예제

```typescript
import {with조사} from '@naverpay/utils'

// 용찬이 리뷰를 해준다.
const str = `${with조사('용찬', '이/가')} 리뷰를 해준다.`

// 용호가 리뷰를 해준다.
const str = `${with조사('용호', '이/가')} 리뷰를 해준다.`
```
