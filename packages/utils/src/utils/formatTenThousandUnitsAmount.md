# formatTenThousandUnitsAmount

만 단위 이상 금액을 표기하는 함수입니다.

## 사용 예제

```typescript
import {formatTenThousandUnitsAmount} from '@naverpay/utils'

// '20억 5,000만'
formatTenThousandUnitsAmount(205000)

// '4,000만'
formatTenThousandUnitsAmount(4000)

// '-1,000만'
formatTenThousandUnitsAmount(-1000)

// ''
formatTenThousandUnitsAmount(0)
```
