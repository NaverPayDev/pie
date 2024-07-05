# debounce

디바운스 함수는 특정 함수가 너무 자주 호출되지 않도록 보장하는 유틸리티입니다. 사용자가 입력 이벤트(예: 키 입력, 클릭 또는 창 크기 조정)를 처리할 때와 같이 함수가 빠르게 여러 번 트리거될 수 있는 시나리오에서 특히 유용합니다. 디바운스 함수를 사용하면 지정된 비활성 기간 후에만 함수가 호출되도록 하여 성능을 향상시키고 불필요한 작업을 방지할 수 있습니다.

## 주요 기능

- Leading Edge Execution: 디바운스 기간 내 첫 번째 호출 시 함수가 즉시 실행되도록 선택할 수 있습니다.
- Trailing Edge Execution: 디바운스 기간 내 마지막 호출 후 함수가 실행되도록 선택할 수 있습니다.
- Max Wait Time: 지정된 기간 내에 함수가 최소 한 번 호출되도록 최대 대기 시간을 강제할 수 있습니다.

## 사용예제

```js
import {debounce} from '@naverpay/utils'

const saveInput = debounce((input) => {
    console.log('Saving data:', input)
}, 200)

// 사용자 입력 시뮬레이션
saveInput('a')
saveInput('ab')
saveInput('abc')

// 200ms 내에 마지막 호출만 함수 실행으로 이어집니다
setTimeout(() => saveInput('abcd'), 250) // 이 호출은 함수를 트리거합니다
```

```js
import {debounce} from '@naverpay/utils'

// 첫 번째 스크롤 이벤트 시 함수가 즉시 트리거됩니다
// 300ms 이내의 후속 스크롤 이벤트는 무시됩니다
const logScrollPosition = debounce(
    () => {
        console.log('Scroll position:', window.scrollY)
    },
    300,
    {leading: true},
)

window.addEventListener('scroll', logScrollPosition)
```

```js
import {debounce} from '@naverpay/utils'

// 사용자가 300ms 동안 입력을 중지한 후에만 함수가 트리거됩니다
const searchSuggestions = debounce(
    (query) => {
        console.log('Fetching suggestions for:', query)
    },
    300,
    {trailing: true},
)

document.getElementById('searchInput').addEventListener('input', (event) => {
    searchSuggestions(event.target.value)
})
```

```js
import {debounce} from '@naverpay/utils'

const resizeHandler = debounce(
    () => {
        console.log('Window resized')
    },
    200,
    {maxWait: 1000},
)

// 사용자가 창 크기를 조정할 때 resizeHandler는 최대 1000ms마다 실행됩니다.
// 이는 창 크기를 지속적으로 조정하더라도 함수가 적어도 1초에 한 번은 실행되도록 보장합니다.
window.addEventListener('resize', resizeHandler)
```

```js
import {debounce} from '@naverpay/utils'

const updatePosition = debounce((position) => {
    console.log('Position updated:', position)
}, 300)

const {debounce: debouncedUpdate, cancel, flush} = updatePosition

debouncedUpdate({x: 100, y: 200})
cancel() // 업데이트가 취소됩니다

debouncedUpdate({x: 300, y: 400})
flush() // 업데이트가 즉시 호출됩니다
```
