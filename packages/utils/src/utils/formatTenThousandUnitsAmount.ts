import numberFormat from './formatNumberWithComma'

/**
 * 만 단위 이상 금액을 표기하는 함수입니다.
 *
 * @param value - 원하는 값
 * @returns
 * 205000 => 20억 5,000만
 * 4000 => 4,000만
 * 260 => 260만
 * -1000 => -1,000만
 * 0 => '' (천원이하 버림)
 * 정수 외 => ''
 */
export default function formatTenThousandUnitsAmount(value: string | number): string {
    if (!Number.isInteger(value)) {
        return ''
    }

    const TEN_THOUSAND_UNITS = 10000
    const numberValue = typeof value === 'string' ? +value : value

    const quotient = Math.trunc(numberValue / TEN_THOUSAND_UNITS) // 몫
    const remainder = numberValue % TEN_THOUSAND_UNITS // 나머지

    const formattedQuotient = quotient !== 0 ? `${numberFormat(quotient)}억` : ''
    const formattedRemainder = remainder !== 0 ? `${numberFormat(remainder)}만` : ''
    const separator = formattedQuotient && formattedRemainder ? ' ' : ''

    return formattedQuotient + separator + formattedRemainder
}
