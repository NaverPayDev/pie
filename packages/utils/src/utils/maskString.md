# maskString

입력된 문자열을 규칙에 따라 마스킹합니다.

## 사용 예제

```typescript
import {maskString} from '@naverpay/utils'

// str: 마스킹할 문자
// indexToMaskFrom: 마스킹 시작 index
// numberOfAsterisk: asterisk(*) 개수
maskString('네이버파이낸셜마스킹', 7, 3)
// 네이버파이낸셜***
```
