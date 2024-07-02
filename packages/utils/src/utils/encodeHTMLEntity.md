# encodeHTMLEntity

<, &, >, ", ' 등의 문자열을 HTML에 삽입할 수 있도록 변경해줍니다.

## 사용 예제

```typescript
import {encodeHTMLEntity} from '@naverpay/utils'

// &lt;
encodeHTMLEntity('<')

// &lt;div&gt;This is example&lt;/div&gt;
encodeHTMLEntity('<div>This is example</div>')
```
