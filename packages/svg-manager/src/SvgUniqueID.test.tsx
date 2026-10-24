import {renderToStaticMarkup} from 'react-dom/server'
import {describe, expect, test} from 'vitest'

import SvgUniqueID from './SvgUniqueID'

// 렌더 결과에서 id 정의와 url(#)/xlinkHref 참조를 추출해, 정의가 없는 참조(dangling)를 찾는다.
function analyze(html: string) {
    const ids = new Set([...html.matchAll(/\sid="([^"]*)"/g)].map((m) => m[1]))
    const refs = [
        ...[...html.matchAll(/url\(#([^)]*)\)/g)].map((m) => m[1]),
        ...[...html.matchAll(/(?:xlink:href|href)="#([^"]*)"/g)].map((m) => m[1]),
    ]
    return {ids, refs, dangling: refs.filter((ref) => !ids.has(ref))}
}

describe('SvgUniqueID', () => {
    test('정의와 모든 참조가 같은 스코프 id로 매칭된다', () => {
        const html = renderToStaticMarkup(
            <SvgUniqueID id="X">
                <svg>
                    <defs>
                        <linearGradient id="grad" />
                        <clipPath id="clip" />
                        <filter id="f" />
                    </defs>
                    <g clipPath="url(#clip)" filter="url(#f)">
                        <rect fill="url(#grad)" />
                    </g>
                    <use xlinkHref="#grad" />
                </svg>
            </SvgUniqueID>,
        )
        const {ids, refs, dangling} = analyze(html)
        expect(refs.length).toBeGreaterThan(0)
        expect(dangling).toEqual([])
        expect(ids.has('__SVG_ID__X__grad__')).toBe(true)
    })

    test('깊게 중첩된 참조까지 스코핑된다', () => {
        const html = renderToStaticMarkup(
            <SvgUniqueID id="X">
                <svg>
                    <linearGradient id="deep" />
                    <g>
                        <g>
                            <rect fill="url(#deep)" />
                        </g>
                    </g>
                </svg>
            </SvgUniqueID>,
        )
        expect(analyze(html).dangling).toEqual([])
        expect(html).toContain('__SVG_ID__X__deep__')
    })

    test('명시 id prop이 스코프에 반영된다', () => {
        const html = renderToStaticMarkup(
            <SvgUniqueID id="myCustomId">
                <svg>
                    <rect id="a" fill="url(#a)" />
                </svg>
            </SvgUniqueID>,
        )
        expect(html).toContain('__SVG_ID__myCustomId__a__')
    })

    test('prefixId를 커스터마이즈할 수 있다', () => {
        const html = renderToStaticMarkup(
            <SvgUniqueID id="X" prefixId="__PFX__">
                <svg>
                    <rect id="a" />
                </svg>
            </SvgUniqueID>,
        )
        expect(html).toContain('__PFX__X__a__')
    })

    test('한 트리 안의 여러 인스턴스는 서로 다른 스코프를 갖는다', () => {
        // SvgUniqueID는 받은 엘리먼트 트리만 변환하므로 raw <svg>를 직접 감싼다(컴포넌트 내부는 스코핑 불가).
        const html = renderToStaticMarkup(
            <div>
                <SvgUniqueID>
                    <svg>
                        <linearGradient id="g" />
                        <rect fill="url(#g)" />
                    </svg>
                </SvgUniqueID>
                <SvgUniqueID>
                    <svg>
                        <linearGradient id="g" />
                        <rect fill="url(#g)" />
                    </svg>
                </SvgUniqueID>
            </div>,
        )
        const ids = [...html.matchAll(/\sid="([^"]*)"/g)].map((m) => m[1])
        expect(ids).toHaveLength(2)
        expect(ids[0]).not.toBe(ids[1])
        expect(analyze(html).dangling).toEqual([])
    })

    test('같은 트리를 두 번 렌더하면 출력이 동일하다', () => {
        const tree = (
            <SvgUniqueID>
                <svg>
                    <linearGradient id="grad" />
                    <rect fill="url(#grad)" />
                </svg>
            </SvgUniqueID>
        )
        expect(renderToStaticMarkup(tree)).toBe(renderToStaticMarkup(tree))
    })

    test('id/url 외의 일반 prop은 변형하지 않는다', () => {
        const html = renderToStaticMarkup(
            <SvgUniqueID id="X">
                <svg>
                    <rect className="cls" width={10} fill="red" />
                </svg>
            </SvgUniqueID>,
        )
        expect(html).toContain('class="cls"')
        expect(html).toContain('fill="red"')
    })
})
