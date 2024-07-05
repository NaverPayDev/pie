import maskString from './maskString'

const maskCardNumber = (card: string) => {
    if (typeof card === 'string') {
        const cardLength = card.length
        return card.substring(0, 4) + maskString(card.substring(4, cardLength - 4)) + card.substring(cardLength - 4)
    }
    return ''
}

export default maskCardNumber
