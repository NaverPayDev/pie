type PhoneNumberInput = string | [string, string, string]

interface ValidatePhoneOptions {
    debug?: boolean
}

export default function isValidKoreanPhoneNumber(input: PhoneNumberInput, options?: ValidatePhoneOptions): boolean {
    let phoneNumber = ''

    if (typeof input === 'string') {
        phoneNumber = input
    } else if (Array.isArray(input) && input.length === 3) {
        phoneNumber = input.join('')
    } else {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Invalid input format: expected a string or [string, string, string].')
        }
        return false
    }

    phoneNumber = phoneNumber.replace(/[-\s]/g, '')

    if (!/^\d+$/.test(phoneNumber)) {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Phone number must contain digits only.', phoneNumber)
        }
        return false
    }

    if (phoneNumber.length !== 10 && phoneNumber.length !== 11) {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Phone number must have exactly 10 or 11 digits.', phoneNumber)
        }
        return false
    }

    if (!phoneNumber.startsWith('01')) {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Phone number must start with "01".', phoneNumber)
        }
        return false
    }

    const carrierDigit = phoneNumber.charAt(2)
    if (!['0', '1', '6', '7', '8', '9'].includes(carrierDigit)) {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Invalid carrier digit after "01".', phoneNumber)
        }
        return false
    }

    const middle = phoneNumber.slice(3, phoneNumber.length - 4)
    const last = phoneNumber.slice(phoneNumber.length - 4)

    if (middle.length !== 3 && middle.length !== 4) {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Middle part must have 3 or 4 digits.', middle)
        }
        return false
    }

    if (last.length !== 4) {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Last part must have exactly 4 digits.', last)
        }
        return false
    }

    return true
}
