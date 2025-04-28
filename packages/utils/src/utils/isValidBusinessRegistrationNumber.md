# isValidBusinessRegistrationNumber

사업자등록번호가 대한민국 유효성 규칙에 맞는지 검증합니다.

10자리 숫자 형식이어야 하며, 3-2-5 포맷(앞 3자리-중간 2자리-마지막 5자리)을 따릅니다.

또한, 가중치와 체크섬 계산을 통해 번호의 유효성을 추가로 검증합니다.

## 사용 예제

```ts
import { isValidBusinessRegistrationNumber } from '@naverpay/utils'

// true (정상 번호)
isValidBusinessRegistrationNumber('204-13-81885')

// true (하이픈 없이도 정상 처리)
isValidBusinessRegistrationNumber('2041381885')

// false (체크섬 불일치)
isValidBusinessRegistrationNumber('123-45-67890')

// false (자리수 부족)
isValidBusinessRegistrationNumber('204-13-8188')
```
