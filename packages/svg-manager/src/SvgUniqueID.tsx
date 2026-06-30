'use client'

import {cloneElement, isValidElement, useId} from 'react'

import deepMap from './utils/deepMap'
import toSafeId from './utils/toSafeId'

import type {PropsWithChildren} from 'react'

// id/xlinkHref 외 모든 prop은 url(#...) 형태로 처리하며, 패턴이 안 맞으면 원본을 그대로 반환한다.
function rewrite(key: string, value: unknown, rename: (id: string) => string): unknown {
    if (typeof value !== 'string') {
        return value
    }
    if (key === 'id') {
        return rename(value)
    }
    if (key === 'xlinkHref') {
        return value.replace(/^#(.*)$/, (_, id) => `#${rename(id)}`)
    }
    return value.replace(/^url\(#(.*)\)$/, (_, id) => `url(#${rename(id)})`)
}

interface SvgUniqueIDProps {
    prefixId?: string
    id?: string
}

const SvgUniqueID = ({children, prefixId = '__SVG_ID__', id}: PropsWithChildren<SvgUniqueIDProps>) => {
    const autoId = toSafeId(useId())
    const instanceId = id ?? autoId

    // 원본 id를 인스턴스별 고유 id로 변환한다.
    const renameId = (originalId: string) =>
        originalId ? `${prefixId}${instanceId}__${toSafeId(originalId)}__` : originalId

    return (
        <>
            {deepMap(children, (child) => {
                if (!isValidElement(child)) {
                    return null
                }

                const rewrittenProps: Record<string, unknown> = {}
                for (const [key, value] of Object.entries(child.props)) {
                    rewrittenProps[key] = rewrite(key, value, renameId)
                }

                return cloneElement(child, rewrittenProps)
            })}
        </>
    )
}

export default SvgUniqueID
