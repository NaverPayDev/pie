# isValidKoreanPhoneNumber

주어진 문자열 또는 문자열 배열이 대한민국 휴대전화번호 규칙에 맞는지 검증합니다.

- 01로 시작하고, 0/1/6/7/8/9 중 하나가 뒤따른 뒤, 숫자 7자리 또는 8자리로 구성되어야 합니다.
- 입력값에 하이픈(-)이나 공백( )이 포함되어 있어도 정상적으로 처리됩니다.
- 숫자가 아닌 다른 문자가 섞여 있으면 실패합니다.
- 옵션으로 디버깅 모드를 활성화하면 검증 실패 사유를 콘솔에 출력할 수 있습니다.

## 사용 예

```ts
import isValidKoreanPhoneNumber from '@naverpay/utils'

// true
isValidKoreanPhoneNumber('010-1234-5678')

// true
isValidKoreanPhoneNumber(['010', '1234', '5678'])

// false
isValidKoreanPhoneNumber('020-1234-5678')

// 디버그 모드 활성화 (검증 실패 원인을 콘솔에 출력)
isValidKoreanPhoneNumber('010-12#34-5678', {debug: true})
```
