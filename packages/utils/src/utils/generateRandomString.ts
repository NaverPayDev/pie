import getSecureMathRandom from './getSecureMathRandom'

/**
 * 임의의 문자열을 생성하기 위한 유틸 함수입니다.
 * @param args prefixes 임의로 생성된 문자열에 붙일 접두사들
 *
 * @returns 임의로 생성된 문자열
 */
export default function generateRandomString<T>(...prefixes: T[]): string {
    const MAX_RADIX = 36
    const DECIMAL_POINT_IDX = 2
    const randomString = getSecureMathRandom().toString(MAX_RADIX).slice(DECIMAL_POINT_IDX)

    return [...prefixes, randomString].join('_')
}
