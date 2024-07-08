import formatTenThousandUnitsAmount from '../src/utils/formatTenThousandUnitsAmount'

describe('formatTenThousandUnitsAmount', () => {
    test('205000 => 20억 5,000만', () => {
        expect(formatTenThousandUnitsAmount(205000)).toEqual('20억 5,000만')
    })

    test('4000 => 4,000만', () => {
        expect(formatTenThousandUnitsAmount(4000)).toEqual('4,000만')
    })

    test('205000 => 20억 5,000만', () => {
        expect(formatTenThousandUnitsAmount(205000)).toEqual('20억 5,000만')
    })

    test('260 => 260만', () => {
        expect(formatTenThousandUnitsAmount(260)).toEqual('260만')
    })

    test('-1000 => -1000만', () => {
        expect(formatTenThousandUnitsAmount(-1000)).toEqual('-1,000만')
    })

    test('0 => ""', () => {
        expect(formatTenThousandUnitsAmount(0)).toEqual('')
    })

    test('나는빡빡이다 => ""', () => {
        expect(formatTenThousandUnitsAmount('나는빡빡이다')).toEqual('')
    })
})
