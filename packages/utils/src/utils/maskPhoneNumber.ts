import maskString from './maskString'

const maskPhoneNumber = (phoneNumber: string) => {
    if (typeof phoneNumber === 'string') {
        if (phoneNumber.startsWith('02')) {
            if (phoneNumber.length === 9) {
                return `02-${phoneNumber[2]}**-${phoneNumber[5]}***`
            }
            if (phoneNumber.length === 10) {
                return `02-${phoneNumber[2]}***-${phoneNumber[6]}***`
            }
        }

        if (phoneNumber.length === 10) {
            return (
                phoneNumber.substring(0, 3) +
                '-' +
                maskString(phoneNumber.substring(3, 6), 1) +
                '-' +
                maskString(phoneNumber.substring(6, 10), 1)
            )
        }
        if (phoneNumber.length === 11) {
            return (
                phoneNumber.substring(0, 3) +
                '-' +
                maskString(phoneNumber.substring(3, 7), 1) +
                '-' +
                maskString(phoneNumber.substring(7, 11), 1)
            )
        }
    }
    return ''
}

export default maskPhoneNumber
