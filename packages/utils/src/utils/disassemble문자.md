# disassemble문자

한글 음절을 초성/중성/종성으로 분리합니다.

## 사용 예제

```typescript
import {disassemble문자} from '@naverpay/utils'

// { first: 'ㄱ', middle: 'ㅏ', last: 'ㄴ'}
disassemble문자('간')

// { first: 'ㄱ', middle: 'ㅏ', last: ''}
disassemble문자('가')
```
