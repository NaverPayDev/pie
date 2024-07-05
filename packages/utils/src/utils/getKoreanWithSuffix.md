# getKoreanWithSuffix

단어와, 단어에 사용가능한 조사 두개를 넘겨주면, 단어에 맞는조사를 붙여줍니다.

## 사용 예제

```typescript
import {getKoreanWithSuffix} from '@naverpay/utils'

// 네이버파이낸셜은
getKoreanWithSuffix('네이버파이낸셜', '은', '는')

// 네이버파이낸셜을
getKoreanWithSuffix('네이버파이낸셜', '을', '를')

// 네이버파이낸셜이
getKoreanWithSuffix('네이버파이낸셜', '이', '가')
```
