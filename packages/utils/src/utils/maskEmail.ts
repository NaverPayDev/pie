import maskString from './maskString'

const maskEmail = (email: string) => {
    if (typeof email === 'string') {
        const emailRegex = /(^[\w-.]+)@([\w-.]+)\.([\w-]+$)/
        const isValidEmail = emailRegex.test(email)
        const maskedEmail = email.replace(emailRegex, (_match, account, domain, rest) => {
            const emailMasked = maskString(account, 2)
            const domainMasked = maskString(domain, 1, 7)
            return `${emailMasked}@${domainMasked}.${rest}`
        })

        return [isValidEmail, maskedEmail]
    }
    return [false, '']
}

export default maskEmail
