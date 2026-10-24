import {Children, cloneElement, isValidElement} from 'react'

import type {ReactElement, ReactNode} from 'react'

function hasChildren(element: ReactNode): element is ReactElement<{children: ReactNode | ReactNode[]}> {
    return isValidElement<{children?: ReactNode[]}>(element) && Boolean(element.props.children)
}

function hasComplexChildren(element: ReactNode): element is ReactElement<{children: ReactNode | ReactNode[]}> {
    return hasChildren(element) && Children.toArray(element.props.children).some((child) => isValidElement(child))
}

function deepMap(
    children: ReactNode | ReactNode[],
    deepMapFn: (child: ReactNode, index?: number, mapChildren?: ReactNode[]) => ReactNode,
): ReactNode[] {
    return Children.toArray(children).map((child: ReactNode, index: number, mapChildren: ReactNode[]) => {
        if (hasComplexChildren(child)) {
            // Clone the child that has children and map them too
            return deepMapFn(
                cloneElement(child, {
                    ...child.props,
                    children: deepMap(child.props.children, deepMapFn),
                }),
            )
        }
        return deepMapFn(child, index, mapChildren)
    })
}

export default deepMap
