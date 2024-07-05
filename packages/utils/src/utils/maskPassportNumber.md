# maskPassportNumber

다음의 규칙으로 여권번호를 마스킹합니다.

- 여권번호 뒷자리 4개만 마스킹

## 사용 예제

```typescript
import {maskPassportNumber} from '@naverpay/utils'

const maskedPassportNumber = maskPassportNumber('M00012345')
console.log(maskedPassportNumber) // M000*****
```
