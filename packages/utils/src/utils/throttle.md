# throttle

Throttle 함수는 특정 함수가 일정 시간 간격 이상으로 호출되도록 제한하는 유틸리티입니다. 이는 고빈도 이벤트(예: 스크롤, 마우스 이동, 키 입력 등)를 처리할 때 함수 호출 빈도를 조절하여 성능을 최적화하는 데 유용합니다. Throttle 함수는 함수가 연속적으로 호출되는 것을 방지하고, 지정된 시간 간격 동안 최소한 한 번은 실행되도록 보장합니다.

## 기능

- Leading Edge Execution: 지정된 시간 간격의 시작 시점에서 함수가 즉시 실행되도록 선택할 수 있습니다.
- Trailing Edge Execution: 지정된 시간 간격이 끝날 때 함수가 실행되도록 선택할 수 있습니다.
- Max Wait Time: 지정된 시간 간격 내에 함수가 최소 한 번 호출되도록 보장합니다.

## 사용예제

```js
import {throttle} from '@naverpay/utils'

// 사용자가 스크롤을 할 때, handleScroll 함수는 200ms마다 한 번 실행됩니다.
const handleScroll = throttle(() => {
    console.log('Scroll event handled')
}, 200)

window.addEventListener('scroll', handleScroll.throttled)
```

```js
import {throttle} from '@naverpay/utils'

// 마우스 이동 시, 함수는 처음에 즉시 실행되고 그 후 300ms 동안은 호출되지 않습니다.
const logMouseMove = throttle(
    () => {
        console.log('Mouse moved')
    },
    300,
    {leading: true, trailing: false},
)

window.addEventListener('mousemove', logMouseMove.throttled)
```

```js
import {throttle} from '@naverpay/utils'

const saveInput = throttle(
    (input) => {
        console.log('Input saved:', input)
    },
    300,
    {trailing: true},
)

// 사용자가 입력할 때, 마지막 입력 후 300ms가 지난 후에야 함수가 실행됩니다.
document.getElementById('textInput').addEventListener('input', (event) => {
    saveInput.throttled(event.target.value)
})
```

```js
import {throttle} from '@naverpay/utils'

const updatePosition = throttle(
    (position) => {
        console.log('Position updated:', position)
    },
    200,
    {maxWait: 1000},
)

// 사용자가 요소를 이동할 때, updatePosition 함수는 최대 1000ms마다 한 번 실행됩니다.
// 즉 200ms는 최소 대기 시간, 1000ms는 최대 대기시간입니다.
document.getElementById('moveable').addEventListener('mousemove', (event) => {
    updatePosition.throttled({x: event.clientX, y: event.clientY})
})
```

```js
import {throttle} from '@naverpay/utils'

const fetchData = throttle((query) => {
    console.log('Fetching data for:', query)
}, 500)

const {throttled: throttledFetch, cancel: cancelFetch} = fetchData

// 500ms를 대기하고 있다가 검색합니다.
document.getElementById('searchInput').addEventListener('input', (event) => {
    throttledFetch(event.target.value)
})

// 사용자가 검색을 중단한 경우, 대기 중인 fetchData 호출을 취소할 수 있습니다.
document.getElementById('cancelButton').addEventListener('click', () => {
    cancelFetch()
})
```
