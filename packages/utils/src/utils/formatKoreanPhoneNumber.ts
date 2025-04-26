type PhoneNumberInput = string | [string, string, string]

interface FormatPhoneOptions {
    debug?: boolean
}

export default function formatKoreanPhoneNumber(input: PhoneNumberInput, options?: FormatPhoneOptions): string | null {
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
        return null
    }

    phoneNumber = phoneNumber.replace(/[-\s]/g, '')

    if (!/^\d+$/.test(phoneNumber)) {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Phone number must contain digits only.', phoneNumber)
        }
        return null
    }

    if (phoneNumber.length !== 10 && phoneNumber.length !== 11) {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Phone number must have exactly 10 or 11 digits.', phoneNumber)
        }
        return null
    }

    if (!/^01[016789]/.test(phoneNumber)) {
        if (options?.debug) {
            if (!phoneNumber.startsWith('01')) {
                // eslint-disable-next-line no-console
                console.error('Phone number must start with "01".', phoneNumber)
            } else {
                // eslint-disable-next-line no-console
                console.error('Invalid carrier code after "01".', phoneNumber)
            }
        }
        return null
    }

    return phoneNumber
}
