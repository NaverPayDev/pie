const maskString = (
    str: string,
    indexToMaskFrom: number = 0,
    numberOfAsterisk: number = str.length - Math.min(indexToMaskFrom, str.length),
) => `${str.slice(0, Math.min(indexToMaskFrom, str.length))}${'*'.repeat(numberOfAsterisk)}`

export default maskString
