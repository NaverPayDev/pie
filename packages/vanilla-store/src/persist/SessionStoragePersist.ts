import {Persistent, isSerializeValue} from './type'

export default class SessionStoragePersist<Value> extends Persistent<Value> {
    get serialized() {
        return window.sessionStorage.getItem(this.key)
    }

    get value(): Value {
        const storageValue = window.sessionStorage.getItem(this.key)
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
            window.sessionStorage.setItem(this.key, JSON.stringify(value))
        }
    }

    clear() {
        try {
            window.sessionStorage.removeItem(this.key)
        } catch {
            // nothing to do
        }
    }
}
