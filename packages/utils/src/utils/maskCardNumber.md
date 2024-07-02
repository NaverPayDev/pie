# maskCardNumber

다음의 규칙으로 카드번호를 마스킹합니다.

- 앞자리 4개, 뒷자리 4개를 제외하고 마스킹

## 사용 예제

```typescript
import {maskCardNumber} from '@naverpay/utils'

const maskedCardNumber = maskCardNumber('01234567890123456789')
console.log(maskedCardNumber) // 0123************6789
```
