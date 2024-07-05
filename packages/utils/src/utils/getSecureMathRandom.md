# getSecureMathRandom

보안 취약점이 있는 `Math.random()` 대신, 안전한 난수 생성 방식을 사용하여 랜덤값을 반환합니다.  
랜덤 값은 기존 `Math.random()` 과 동일하게 0~1 사이로 생성됩니다.

## 사용 예제

```typescript
import {getSecureMathRandom} from '@naverpay/utils'

// 0과 1사이의 난수
getSecureMathRandom()
```
