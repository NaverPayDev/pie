import formatNumberWithComma from '../src/utils/formatNumberWithComma'

describe('formatNumberWithComma', () => {
    test("'1000' -> '1,000'", () => {
        expect(formatNumberWithComma('1000')).toEqual('1,000')
    })

    test("1000 -> '1,000'", () => {
        expect(formatNumberWithComma(1000)).toEqual('1,000')
    })

    test("'100' -> '100'", () => {
        expect(formatNumberWithComma('100')).toEqual('100')
    })

    test("1000000 -> '1,000,000'", () => {
        expect(formatNumberWithComma(1000000)).toEqual('1,000,000')
    })

    test("'1,000,000' -> '1,000,000'", () => {
        expect(formatNumberWithComma('1,000,000')).toEqual('1,000,000')
    })
})
