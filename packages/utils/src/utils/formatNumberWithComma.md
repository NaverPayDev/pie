# formatNumberWithComma

숫자 또는 문자열을 천단위로 나누어 구분자를 추가합니다.
숫자로 변환할 수 없는 문자열은 그대로 문자열을 리턴합니다.

## 사용 예제

```typescript
import {formatTenThousandUnitsAmount} from '@naverpay/utils'

// '1,000'
formatTenThousandUnitsAmount('1000')

// '1,000'
formatTenThousandUnitsAmount(1000)

// '1,000,000'
formatTenThousandUnitsAmount('1,000,000')
```
