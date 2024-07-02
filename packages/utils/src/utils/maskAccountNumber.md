# maskAccountNumber

다음의 규칙으로 계좌번호를 마스킹합니다.

- 앞자리 3개, 뒷자리 4개를 제외하고 마스킹

## 사용 예제

```typescript
import {maskAccountNumber} from '@naverpay/utils'

const maskedAccountNumber = maskAccountNumber('01234567890')
console.log(maskedAccountNumber) // 012****7890
```
