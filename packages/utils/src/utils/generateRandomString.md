# generateRandomString

임의의 문자열을 반환합니다.

## 사용 예제

```typescript
import {generateRandomString} from '@naverpay/utils'

// 임의의 문자열
generateRandomString()

// `pie_${임의의_문자열}`
generateRandomString('pie')

// `pie_cu_${임의의_문자열}`
generateRandomString('pie', 'cu')
```
