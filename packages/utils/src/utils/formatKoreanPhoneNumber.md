# formatKoreanPhoneNumber

주어진 문자열 또는 문자열 배열을 대한민국 휴대전화번호 규칙에 맞게 변환합니다.

- 01로 시작하고, 0/1/6/7/8/9 중 하나가 뒤따른 뒤, 숫자 7자리 또는 8자리로 구성된 번호를 하이픈 없이 숫자만 이어 붙인 형태로 반환합니다.
- 입력값에 하이픈(-)이나 공백( )이 포함되어 있어도 자동으로 제거하여 처리합니다.
- 숫자가 아닌 다른 문자가 포함된 경우에도 모두 제거하여, 결과적으로 숫자만 남긴 후 검증합니다.
- 디버깅 모드를 활성화하면 검증 실패 사유를 콘솔에 출력할 수 있습니다.

## 사용 예

```ts
import {formatKoreanPhoneNumber} from '@naverpay/utils'

// '01012345678'
formatKoreanPhoneNumberSafe('010-1234-5678')

// '0111234567'
formatKoreanPhoneNumberSafe(['011', '123', '4567'])

// null (잘못된 번호)
formatKoreanPhoneNumberSafe('020-1234-5678')

// 디버그 모드 활성화 (검증 실패 원인을 콘솔에 출력)
formatKoreanPhoneNumberSafe('010-12#34-5678', {debug: true})

```
