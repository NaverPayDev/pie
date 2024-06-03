import {PropsWithChildren, ReactElement, cloneElement} from 'react'

import {generateRandomString, toSingleton} from './utils'
import deepMap from './utils/deepMap'

const reactRecursiveChildrenMap = deepMap.bind(deepMap)

const generateLocalIdMap = toSingleton(() => new Map<string, number>())
const localIdsMap = generateLocalIdMap()

const SvgUniqueID = ({
    children,
    prefixId = '__SVG_ID__',
    id = generateRandomString(),
}: PropsWithChildren<{prefixId?: string; id?: string}>) => {
    let lastLocalId: number = 0

    const getHookedId = (originalId?: string) => {
        if (!originalId) {
            return null
        }
        if (!localIdsMap.has(originalId)) {
            localIdsMap.set(originalId, lastLocalId++)
        }

        const localId = localIdsMap.get(originalId)
        return `${prefixId}${id}__${localId}__`
    }

    const fixPropWithUrl = (prop: string) => {
        if (typeof prop !== 'string') {
            return prop
        }

        const [, originalId] = prop.match(/^url\(#(.*)\)$/) || [null, null]

        if (originalId === null) {
            return prop
        }

        const fixedId = getHookedId(originalId)

        if (fixedId === null) {
            return prop
        }

        return `url(#${fixedId})`
    }

    const getHookedXlinkHref = (prop: string) => {
        if (typeof prop !== 'string' || !prop.startsWith('#')) {
            return prop
        }

        const originalId = prop.replace('#', '')

        const fixedId = getHookedId(originalId)
        if (fixedId === null) {
            return prop
        }

        return `#${fixedId}`
    }

    return (
        <>
            {reactRecursiveChildrenMap(children, (child) => {
                if (
                    !child ||
                    typeof child === 'string' ||
                    typeof child === 'number' ||
                    !('props' in (child as ReactElement))
                ) {
                    return null
                }

                const ch = child as ReactElement

                const fixedId = getHookedId(ch.props.id)

                const fixedProps = {
                    ...ch.props,
                }

                Object.keys(fixedProps).map((key) => (fixedProps[key] = fixPropWithUrl(fixedProps[key])))
                return cloneElement(ch, {
                    ...fixedProps,
                    id: fixedId,
                    xlinkHref: getHookedXlinkHref(ch.props.xlinkHref),
                })
            })}
        </>
    )
}

export default SvgUniqueID
