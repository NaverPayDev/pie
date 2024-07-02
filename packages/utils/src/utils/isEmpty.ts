/**
 * 해당 객체나 문자열이 비어있는지 확인합니다.
 * 문자열의 경우 공백을 trim하지 않습니다.
 *
 * @param value
 * @returns
 */
export default function isEmpty(value: object | string): boolean {
    if (typeof value === 'object') {
        return Array.isArray(value) ? value.length === 0 : Object.keys(value).length === 0
    } else {
        return value.length === 0
    }
}
