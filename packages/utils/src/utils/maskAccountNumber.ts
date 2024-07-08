import maskString from './maskString'

const maskAccountNumber = (account: string) => {
    if (typeof account === 'string') {
        const accountLength = account.length
        return (
            account.substring(0, 3) +
            maskString(account.substring(3, accountLength - 4)) +
            account.substring(accountLength - 4)
        )
    }
    return ''
}

export default maskAccountNumber
