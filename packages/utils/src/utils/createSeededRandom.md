# createSeededRandom

선형 합동 생성기 Linear Congruential Generator, LCG 를 사용하여 시드값을 기반으로 랜덤값을 생성합니다. 함수 실행마다 새로운 랜덤값을 생성하지만, 이 값들은 seed가 동일하다면 모두 동일합니다.

## 주의 사항

이 seed 난수 생성기는 안정성이 검증된 알고리즘이 아닙니다. 난수가 중요한 경우라면 [`getSecureMathRandom`](./getSecureMathRandom.md) 를 사용해주세요.

## 사용 예제

```typescript
import {createSeededRandom} from '@naverpay/utils'

// 0과 1사이의 난수
createSeededRandom()

const seed = new Date().getTime()
// random1과 random2는 시드값이 동일하기 때문에 같은 값
const random1 = createSeededRandom(seed)
const random2 = createSeededRandom(seed)
```
