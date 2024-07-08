# isEmpty

해당 객체나 문자열이 비어있는지 확인합니다.
단, 문자열의 경우 공백을 trim하지 않습니다.

## 사용 예제

```typescript
import {isEmpty} from '@naverpay/utils'

console.log(isEmpty('')) // true
console.log(isEmpty('  ')) // false
console.log(isEmpty('네이버')) // false

console.log(isEmpty([])) // true
console.log(isEmpty([1, 2, 3])) // false

console.log(isEmpty({})) // true
console.log(isEmpty({key: 'value'})) // false
```
