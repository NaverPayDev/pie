import createNumberFormatter from '../src/utils/createNumberFormatter'

describe('createNumberFormatter', () => {
    describe('기본 변환', () => {
        it.each([
            [0, 0, '0'],
            ['000', 0, '0'],
            ['001', 0, '1'],
            ['1과2분의1', 0, '1'],
            ['NaN', 0, '0'],
            ['NaN', undefined, '0'],
        ])('(%s, %s) => "%s"', (input, defaultValue, expected) => {
            const formatter = createNumberFormatter({})

            const output = formatter(input, defaultValue)
            expect(output).toBe(expected)
        })
    })

    describe('컴마', () => {
        it.each([
            ['1234', -1, '1234'],
            ['1234', 0, '1234'],
            ['1234', 1, '1,2,3,4'],
            ['1234', 2, '12,34'],
            ['1234', 3, '1,234'],
            ['1234', 4, '1234'],
            ['123123.1242', 3, '123,123'],
        ])('(%d, %d) => "%s"', (input, width, expected) => {
            const formatter = createNumberFormatter({
                comma: {
                    width,
                },
            })

            const output = formatter(input)
            expect(output).toBe(expected)
        })
    })

    describe('단위', () => {
        it.each([
            [123, '원', true, '123 원'],
            [123, '원', false, '123원'],
            [123, '원', undefined, '123원'],
            [0, '', false, '0'],
            [0, '$', true, '0 $'],
            ['000', '원', true, '0 원'],
        ])('(%s, %s, %s) => "%s"', (input, text, space, expected) => {
            const formatter = createNumberFormatter({
                unit: {
                    text,
                    space,
                },
            })

            const output = formatter(input)
            expect(output).toBe(expected)
        })
    })

    describe('부호', () => {
        it.each([
            [123, true, false, false, '+123'],
            [123, false, false, false, '123'],
            [-123, true, false, false, '-123'],
            [-123, false, false, false, '-123'],
            [123, true, true, false, '+ 123'],
            [123, false, true, false, '123'],
            [-123, true, true, false, '- 123'],
            [-123, false, true, false, '- 123'],
            ['123', true, false, false, '+123'],
            ['-123', true, false, false, '-123'],
            ['0', true, false, true, '0'],
            ['0', true, false, false, '+0'],
        ])('(%s, %s, %s, %s) => "%s"', (input, always, space, skipSignAtZero, expected) => {
            const formatter = createNumberFormatter({
                sign: {
                    always,
                    space,
                    skipSignAtZero,
                },
            })

            const output = formatter(input)
            expect(output).toBe(expected)
        })
    })

    describe('고정 길이', () => {
        it.each([
            [123, 3, 0, ' ', '123'],
            [123, 4, 0, ' ', ' 123'],
            [123, 10, 0, ' ', '       123'],
            [123, 10, 0, '@', '@@@@@@@123'],
            [123, 1, 0, undefined, '123'],
            [123, 4, 2, ' ', '123.00'],
            [123, 5, 2, ' ', '123.00'],
            [123, 6, 2, ' ', '123.00'],
            [123, 7, 2, ' ', ' 123.00'],
        ])('(%s, %s, %s, "%s") => "%s"', (input, length, fractionDigits, fillString, expected) => {
            const formatter = createNumberFormatter({
                fixed: {
                    length,
                    fractionDigits,
                    fillString,
                },
            })

            const output = formatter(input)
            expect(output).toBe(expected)
        })
    })

    describe('복합 옵션', () => {
        it.each([
            ['100.23', '+ __________100.23 원'],
            ['-200', '- __________200.00 원'],
            ['1234567.123', '+ ____1,234,567.12 원'],
            ['1234567890', '+ 1,234,567,890.00 원'],
            ['12345678901234567890', '+ 12,345,678,901,234,567,000.00 원'],
            ['100.23', '+ __________100.23 원'],
            ['NaN', '+ ____________0.00 원'],
        ])('원 단위 표시 (%d) => "%s"', (input, expected) => {
            const formatter = createNumberFormatter({
                comma: {
                    width: 3,
                },
                unit: {
                    text: '원',
                    space: true,
                },
                sign: {
                    always: true,
                    space: true,
                },
                fixed: {
                    length: 20,
                    fractionDigits: 2,
                    fillString: '_',
                    signStart: true,
                },
            })

            const output = formatter(input)
            expect(output).toBe(expected)
        })

        it.each([
            ['100.23', '            100.230$'],
            ['-200', '           -200.000$'],
            ['1234567.123', '      1,234,567.123$'],
            ['1234567890', '  1,234,567,890.000$'],
            ['12345678901234567890', '12,345,678,901,234,567,000.000$'],
            ['100.23', '            100.230$'],
            ['NaN', '              0.000$'],
        ])('달러 단위 표시 (%d) => "%s"', (input, expected) => {
            const formatter = createNumberFormatter({
                comma: {
                    width: 3,
                },
                unit: {
                    text: '$',
                },
                fixed: {
                    length: 20,
                    fractionDigits: 3,
                },
            })

            const output = formatter(input)
            expect(output).toBe(expected)
        })
    })
})
