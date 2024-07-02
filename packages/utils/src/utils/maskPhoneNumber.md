# maskPhoneNumber

다음의 규칙으로 휴대전화 번호를 마스킹합니다.

- 개별번호 각각에 뒷자리 3개 마스킹
  - 3자리인 경우 뒷자리 2개 마스킹

## 사용 예제

```typescript
import {maskPhoneNumber} from '@naverpay/utils'

const maskedPhoneNumber1 = maskPhoneNumber('01012345678')
console.log(maskedPhoneNumber1) // 010-1***-5***

const maskedPhoneNumber2 = maskPhoneNumber('0111235678')
console.log(maskedPhoneNumber2) // 011-1**-5***
```
