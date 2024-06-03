/**
 * @description 숫자 열거 타입
 * @example Enumerate<2> // 0 | 1
 */
export type Enumerate<N extends number, Arr extends number[] = []> = Arr['length'] extends N
    ? Arr[number]
    : Enumerate<N, [...Arr, Arr['length']]>

/**
 * @description 범위 지정 타입
 * @example IntRange<1, 100> // 1 | 2 | 3 | 4 | ... | 99
 */
export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
