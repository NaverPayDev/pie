import maskString from './maskString'

const maskPassportNumber = (passport: string) => {
    if (typeof passport === 'string') {
        const passportLength = passport.length
        return passport.substring(0, passportLength - 5) + maskString(passport.substring(passportLength - 5))
    }
    return ''
}

export default maskPassportNumber
