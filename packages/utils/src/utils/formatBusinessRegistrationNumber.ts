import {isValidBusinessRegistrationNumber} from './isValidBusinessRegistrationNumber'

type BusinessNumberInput = string | [string, string, string]

interface FormatBusinessOptions {
    debug?: boolean
}

export function formatBusinessRegistrationNumber(
    input: BusinessNumberInput,
    options?: FormatBusinessOptions,
): string | null {
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
        return null
    }

    businessNumber = businessNumber.replace(/[-\s]/g, '')

    if (!/^\d+$/.test(businessNumber)) {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Business number must contain digits only.', businessNumber)
        }
        return null
    }

    if (!isValidBusinessRegistrationNumber(businessNumber, options)) {
        if (options?.debug) {
            // eslint-disable-next-line no-console
            console.error('Business number failed checksum validation.', businessNumber)
        }
        return null
    }

    return businessNumber
}
