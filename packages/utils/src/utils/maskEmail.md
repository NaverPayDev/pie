# maskEmail

다음의 규칙으로 이메일을 마스킹합니다.

- 이메일 앞자리 2개를 제외하고 마스킹
- 도메인 앞자리 1개를 제외하고 마스킹

## 사용 예제

```typescript
import {maskEmail} from '@naverpay/utils'

const [isValidEmail, maskedEmail] = maskEmail('financial@pay.naver.com')
console.log(isValidEmail) // true
console.log(maskedEmail) // fi*******@p*******.com
```
