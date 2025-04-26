# formatBusinessRegistrationNumber

## 사용예

사업자등록번호를 하이픈 없이 숫자만 이어 붙인 형태로 변환합니다.

10자리 숫자 형식이어야 하며, 유효성 검사를 통과하지 못하면 null을 반환합니다.

(유효성 검사는 `isValidBusinessRegistrationNumber`를 통해 수행합니다.)

```ts
import { formatBusinessRegistrationNumber } from '@naverpay/utils'

// '2041381885'
formatBusinessRegistrationNumber('204-13-81885')

// '2041381885'
formatBusinessRegistrationNumber(['204', '13', '81885'])

// null (체크섬 오류로 유효성 실패)
formatBusinessRegistrationNumber('123-45-67890')

// null (자리수 오류)
formatBusinessRegistrationNumber('204138188')
```
