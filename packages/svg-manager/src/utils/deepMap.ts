import {Children, cloneElement, isValidElement} from 'react'

import type {ReactElement, ReactNode} from 'react'

function hasChildren(element: ReactNode): element is ReactElement<{children: ReactNode | ReactNode[]}> {
    return isValidElement<{children?: ReactNode[]}>(element) && Boolean(element.props.children)
}

function hasComplexChildren(element: ReactNode): element is ReactElement<{children: ReactNode | ReactNode[]}> {
    return (
        isValidElement(element) &&
        hasChildren(element) &&
        Children.toArray(element.props.children).reduce(
            (response: boolean, child: ReactNode): boolean => response || isValidElement(child),
            false,
        )
    )
}

function deepMap(
    children: ReactNode | ReactNode[],
    deepMapFn: (child: ReactNode, index?: number, children?: ReactNode[]) => ReactNode,
): ReactNode[] {
    return Children.toArray(children).map((child: ReactNode, index: number, mapChildren: ReactNode[]) => {
        if (isValidElement(child) && hasComplexChildren(child)) {
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
