import {describe, expect, test} from 'vitest'

import isEmpty from '../src/utils/isEmpty'

describe('isEmpty', () => {
    test('""', () => {
        expect(isEmpty('')).toEqual(true)
    })

    test('[]', () => {
        expect(isEmpty([])).toEqual(true)
    })

    test('{}', () => {
        expect(isEmpty({})).toEqual(true)
    })

    test('네이버', () => {
        expect(isEmpty('네이버')).toEqual(false)
    })

    test('[0, 1, 2]', () => {
        expect(isEmpty([0, 1, 2])).toEqual(false)
    })

    test('{key: "value"}', () => {
        expect(isEmpty({key: 'value'})).toEqual(false)
    })
})
