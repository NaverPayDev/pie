import createKeyValuePairObject from '../src/utils/createKeyValuePairObject'

describe('createKeyValuePairObject', () => {
    test(`["KEY_A", "KEY_B", "KEY_C"]를 사용하여 KV pair object를 생성할 수 있다.`, () => {
        const input = ['KEY_A', 'KEY_B', 'KEY_C']

        const output = createKeyValuePairObject(input)
        expect(Object.keys(output).length).toEqual(input.length)
        expect(
            Object.keys(output).every((keyInObject, index) => {
                return keyInObject === input[index] && output[keyInObject] === input[index]
            }),
        ).toBeTruthy()
    })
})
