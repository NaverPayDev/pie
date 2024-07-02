# deepMerge

주어진 객체들을 순서대로 병합하며 하나의 객체를 반환합니다.

## 사용 예제

```typescript
import {deepMerge} from '@naverpay/utils'

// {a: 1, b: 2}
deepMerge([{a: 1}, {b: 2}])

// {b: 2}
deepMerge([{a: 1}, {a: undefined, b: 2}])

// {a: 1, b: 2}
deepMerge([{a: 1}, {a: undefined, b: 2}], false)
```
