# get조사

한글 단어의 마지막 단어에 따라 조사를 가지고 옵니다.  
받침이 ㄹ 이고 조사가 으로/로 라면 로를 반환합니다.

## 사용 예제

```typescript
import {get조사} from '@naverpay/utils'

// 이
get조사('용찬', '이/가')

// 가
get조사('용호', '이/가')
```
