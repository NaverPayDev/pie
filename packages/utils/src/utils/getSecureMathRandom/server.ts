export function getSecureMathRandomServer() {
    const array = new Uint32Array(1)
    const maxNumber = Math.pow(2, 32) - 1

    if (!crypto || !crypto?.getRandomValues) {
        // eslint-disable-next-line no-console
        console.log(
            "If the node version is less than 20, a require ('crypto') is required. To use the getSecureMathRandomServer properly, update the node version to 20 or higher.",
        )
        return Math.random()
    }

    return crypto.getRandomValues(array)[0] / maxNumber
}
