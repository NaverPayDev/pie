# createNumberFormatter

`createNumberFormatter`는 손쉽게 숫자를 포맷팅하는 함수를 만들어주는 고차함수입니다.

## 사용 예제

```typescript
const formatUSD = createNumberFormatter({comma: {width: 3}, unit: {text: 'USD', space: true}})

formatUSD(10000) // 10,000 USD
```
