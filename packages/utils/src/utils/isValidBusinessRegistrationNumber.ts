type BusinessNumberInput = string | [string, string, string]

interface ValidateBusinessOptions {
    debug?: boolean
}

export function isValidBusinessRegistrationNumber(
    input: BusinessNumberInput,
    options?: ValidateBusinessOptions,
): boolean {
    let businessNumber = ''

    if (typeof input === 'string') {
        businessNumber = input
    } else if (Array.isArray(input) && input.length === 3) {
        businessNumber = input.join('')
    } else {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Invalid input format: expected a string or [string, string, string].')
        }
        return false
    }

    businessNumber = businessNumber.replace(/[-\s]/g, '')

    if (!/^\d+$/.test(businessNumber)) {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Business number must contain digits only.', businessNumber)
        }
        return false
    }

    if (businessNumber.length !== 10) {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Business number must have exactly 10 digits.', businessNumber)
        }
        return false
    }

    const first = businessNumber.slice(0, 3)
    const middle = businessNumber.slice(3, 5)
    const last = businessNumber.slice(5)

    if (first.length !== 3 || middle.length !== 2 || last.length !== 5) {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Business number must follow 3-2-5 structure.', businessNumber)
        }
        return false
    }

    const digits = businessNumber.split('').map(Number)
    const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5]

    let sum = 0
    for (let i = 0; i < 9; i++) {
        sum += digits[i] * weights[i]
    }
    sum += Math.floor((digits[8] * 5) / 10)

    const remainder = sum % 10
    const checkDigit = (10 - remainder) % 10

    if (checkDigit !== digits[9]) {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Business number checksum validation failed.', businessNumber)
        }
        return false
    }

    return true
}
