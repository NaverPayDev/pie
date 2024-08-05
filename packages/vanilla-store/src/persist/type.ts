export function isSerializeValue(value: unknown): boolean {
    try {
        JSON.stringify(value as string)
        return true
    } catch (e) {
        return false
    }
}

export abstract class Persistent<Value> {
    constructor(public key: string, protected _value: Value, public typeAssertion: (value: unknown) => value is Value) {
        this._value = _value
        this.typeAssertion = typeAssertion
    }

    abstract get value(): Value | null

    abstract set value(value: Value | null)

    abstract clear(): void
}
