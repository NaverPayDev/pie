# @naverpay/utils

자바스크립트 유틸리티 라이브러리입니다. (타입스크립트 지원)

## Installation

```sh
npm install @naverpay/utils
```

## Modules

| Name                                                                        | Description                                                                                                                                                    |
| :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [마지막\_문자\_받침\_여부](./src/utils/마지막_문자_받침_여부.md)            | 한글의 마지막 단어 받침 여부를 확인합니다.                                                                                                                     |
| [한글\_여부](./src/utils/한글_여부.md)                                      | 단어가 한글인지 확인합니다.                                                                                                                                    |
| [backOrClose](./src/utils/backOrClose.md)                                   | 현재페이지에서 이전페이지가 있다면 뒤로가고, 이전 페이지가 없다면 현재창을 닫습니다.                                                                           |
| [createKeyValuePairObject](./src/utils/createKeyValuePairObject.md)         | Key와 동일한 문자열을 가진 Value를 연결한 Object를 생성합니다.                                                                                                 |
| [createNumberFormatter](./src/utils/createNumberFormatter.md)               | 숫자를 포맷팅하는 함수를 만들어주는 고차함수                                                                                                                   |
| [createSeededRandom](./src/utils/createSeededRandom.md)                     | 선형 합동 생성기(Linear Congruential Generator, LCG)를 사용하여 시드값을 기반으로 랜덤값을 생성합니다.                                                         |
| [createUrlLike](./src/utils/createUrlLike.md)                               | `URL` 클래스를 지원하지 않는 환경(IE11 등)까지 고려해야 할 때 사용하는 함수로, 환경에 따라 `URL`, `HTMLAnchorElement` 순서의 우선순위로 인스턴스를 생성합니다. |
| [debounce](./src/utils/debounce.md)                                         | 특정 함수가 너무 자주 호출되지 않도록 보장하는 유틸리티입니다.                                                                                                 |
| [deepMerge](./src/utils/deepMerge.md)                                       | 주어진 객체들을 순서대로 병합하며 하나의 객체를 반환합니다.                                                                                                    |
| [DeferredPromise](./src/utils/DeferredPromise.md)                           | pending 상태의 promise 객체를 생성하여, 외부에서 resolve, reject 할 수 있게 합니다.                                                                            |
| [disassemble문자](./src/utils/disassemble문자.md)                           | 한글 한글자를 초성/중성/종성으로 분리합니다.<br>ex) 밟 > ㅂ / ㅏ / ㄹㅂ                                                                                        |
| [encodeHTMLEntity](./src/utils/encodeHTMLEntity.md)                         | `<`, `&`, `>`, `"`, `'` 등의 문자열을 HTML에 삽입할 수 있도록 변경해줍니다.                                                                                    |
| [formatNumberWithComma](./src/utils/formatNumberWithComma.md)               | 숫자 또는 문자열을 천단위로 나누어 구분자를 추가합니다.                                                                                                        |
| [formatTenThousandUnitsAmount](./src/utils/formatTenThousandUnitsAmount.md) | 만 단위 이상 금액을 표기하는 함수입니다.                                                                                                                       |
| [generateRandomString](./src/utils/generateRandomString.md)                 | 임의의 문자열을 반환합니다.                                                                                                                                    |
| [get조사](./src/utils/get조사.md)                                           | 한글 단어의 마지막 단어에 따라 조사를 가지고 옵니다.                                                                                                           |
| [getKoreanWithSuffix](./src/utils/getKoreanWithSuffix.md)                   | 단어에 알맞는 조사를 붙여 반환합니다.                                                                                                                          |
| [getRandomNumber](./src/utils/getRandomNumber.md)                           | 최대 값을 받아 0부터 최대 값 - 1 사이의 무작위 정수를 반환합니다.                                                                                              |
| [getSecureMathRandom](./src/utils/getSecureMathRandom.md)                   | 보안 취약점이 있는 `Math.random()` 대신, 안전한 난수 생성 방식을 사용하여 랜덤값을 반환합니다.                                                                 |
| [isEmpty](./src/utils/isEmpty.md)                                           | 해당 객체나 문자열이 비어있는지 확인합니다.                                                                                                                    |
| [maskAccountNumber](./src/utils/maskAccountNumber.md)                       | 계좌번호를 앞자리 3개, 뒷자리 4개를 제외하고 마스킹합니다.                                                                                                     |
| [maskCardNumber](./src/utils/maskCardNumber.md)                             | 카드번호를 앞자리 4개, 뒷자리 4개를 제외하고 마스킹합니다.                                                                                                     |
| [maskEmail](./src/utils/maskEmail.md)                                       | 이메일을 아이디 앞자리 2개 제외, 도메인 앞자리 1개를 제외하고 마스킹합니다.                                                                                    |
| [maskPassportNumber](./src/utils/maskPassportNumber.md)                     | 여권번호를 뒷자리 4개만 마스킹합니다.                                                                                                                          |
| [maskPhoneNumber](./src/utils/maskPhoneNumber.md)                           | 휴대전화 번호를 마스킹합니다.                                                                                                                                  |
| [maskString](./src/utils/maskString.md)                                     | 입력된 문자열을 규칙에 따라 마스킹합니다.                                                                                                                      |
| [replaceNoBreakSpace](./src/utils/replaceNoBreakSpace.md)                   | 공백을 NO-BREAK SPACE인 U+00A0으로 변환해줍니다.                                                                                                               |
| [sleep](./src/utils/sleep.md)                                               | `sleep`는 자바스크립트의 쓰레드를 ms 만큼 중지(지연) 시킵니다.                                                                                                 |
| [throttle](./src/utils/throttle.md)                                         | 특정 함수가 일정 시간 간격 이상으로 호출되도록 제한하는 유틸리티입니다.                                                                                        |
| [with조사](./src/utils/with조사.md)                                         | 한글 단어의 마지막 단어에 따라 단어 + 조사를 반환합니다.                                                                                                       |

## Contribution

여러 프로젝트, 혹은 프로젝트 내부에 걸쳐서 여러 군데에서 사용 가능한 유틸이 있다면 자유롭게 추가하실 수 있습니다. 유틸 추가 시에는 아래 사항을 준수해주세요.

- typescript로 작성되어야 합니다.
- 필요시 적절한 테스트 코드를 추가해주세요.
- 공통으로 사용되는 유틸인지, 순수함수인지 한번 더 확인해주세요.
