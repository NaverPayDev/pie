import {Persistent, isSerializeValue} from './type'

export default class LocalStoragePersist<Value> extends Persistent<Value> {
    get deserialized() {
        return window.localStorage.getItem(this.key)
    }

    get value(): Value {
        const storageValue = window.localStorage.getItem(this.key)

        if (!isSerializeValue(storageValue)) {
            return this._value
        }

        const parsedValue = storageValue ? JSON.parse(storageValue) : null

        if (!this.typeAssertion(parsedValue)) {
            return this._value
        }

        if (this._value !== parsedValue) {
            this._value = parsedValue
        }

        return this._value
    }

    set value(value: Value) {
        if (this.typeAssertion(value)) {
            this._value = value
            window.localStorage.setItem(this.key, JSON.stringify(value))
        }
    }

    clear() {
        try {
            window.localStorage.removeItem(this.key)
        } catch {
            // nothing to do
        }
    }
}
