/**
 * 숫자/또는 문자열을 천단위로 ,를 찍어줍니다.
 * 숫자로 변환할 수 없는 문자열은 그대로 문자열을 리턴합니다.
 * numberFormat입니다.
 *
 * @param value 변환을 원하는 숫자 또는 문자열
 *
 * @returns , 가 찍힌 문자열
 */
export default function formatNumberWithComma(value: string | number): string {
    if (typeof value === 'string' && isNaN(+value)) {
        return value
    }

    let formattedNumber = `${value}`

    const reg = /(^[+-]?\d+)(\d{3})/

    while (reg.test(formattedNumber)) {
        formattedNumber = formattedNumber.replace(reg, '$1,$2')
    }

    return formattedNumber
}
