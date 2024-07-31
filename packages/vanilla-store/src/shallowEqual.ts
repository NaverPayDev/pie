/* eslint-disable @typescript-eslint/no-explicit-any */
function is(x: any, y: any) {
    return (
        (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
    )
}

const objectIs: (x: any, y: any) => boolean = typeof Object.is === 'function' ? Object.is : is

/**
 * @description compare two objects shallowly. inspired by https://github.com/facebook/react/blob/main/packages/shared/shallowEqual.js
 * @param a
 * @param b
 * @returns boolean
 */
export default function shallowEqual<T>(a: T, b: T): boolean {
    if (objectIs(a, b)) {
        return true
    }

    if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
        return false
    }

    const keysA = Object.keys(a as any)
    const keysB = Object.keys(b as any)

    if (keysA.length !== keysB.length) {
        return false
    }

    for (const key of keysA) {
        if (!Object.prototype.hasOwnProperty.call(b, key) || (a as any)[key] !== (b as any)[key]) {
            return false
        }
    }

    return true
}
