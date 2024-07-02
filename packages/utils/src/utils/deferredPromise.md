# deferredPromise

pending 상태의 promise 객체를 생성하여, 외부에서 resolve, reject 할 수 있게 합니다.

## 사용 예제

```typescript
import {DeferredPromise} from '@naverpay/utils'

const deferredPromise = new DeferredPromise<string>()

async function waitAndPrint() {
    const name = await deferredPromise // 일반적인 promise로 취급 가능
    console.log(`hello, ${name}!`)
}

waitAndPrint()
waitAndPrint()
waitAndPrint() // 이 시점에는 console.log가 출력되지 않음

deferredPromise.resolve('world')
// 이 시점에서 "hello, world!"가 3번 출력됨
```
