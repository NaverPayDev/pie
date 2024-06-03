# SvgUniqueID

svg 컴포넌트 내부 요소의 id가 동일한 경우, 동일한 영역에서 svg 컴포넌트를 여러 번 사용할 때 `<svg>` 내부 요소가 제대로 그려지지 않을 수 있습니다.

SvgUniqueID는 이러한 id 중복 문제를 피하기 위한 Wrapper 컴포넌트로, svg 컴포넌트 내부 요소에 동적으로 id를 할당할 수 있습니다.

<img src="https://github.com/NaverPayDev/pie/assets/52737532/bc12bef1-8887-4d42-b918-2668a18af74f" width="300" alt="svg example"/>

## Usage

```tsx
import {SvgUniqueID} from '@naverpay/svg-manager'
import type {SVGStyleProps} from '@naverpay/svg-manager'

function Logo({width, height, viewBox, id, style}: SVGStyleProps) {
    return (
        <SvgUniqueID id={id}>
            <svg width={width} height={height} viewBox={viewBox} style={style}>
                <g id="Group">
                    <g id="Group_2">
                        <g id="Group_3">...</g>
                    </g>
                </g>
            </svg>
        </SvgUniqueID>
    )
}
```

![img2](https://github.com/NaverPayDev/pie/assets/52737532/968013a2-ac1b-40b9-8875-cbcb32d092be)
