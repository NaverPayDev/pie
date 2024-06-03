// TODO: common-utils 이관 필요
declare global {
    interface Window {
        msCrypto: Crypto
    }
}

function getSecureMathRandomBrowser() {
    const array = new Uint32Array(1)
    const maxNumber = Math.pow(2, 32) - 1

    if (typeof window.msCrypto !== 'undefined') {
        return window.msCrypto.getRandomValues(array)[0] / maxNumber
    }

    if (typeof window.crypto !== 'undefined') {
        return window.crypto.getRandomValues(array)[0] / maxNumber
    }

    // eslint-disable-next-line no-console
    console.log(`fail to generate secure random. Neither window.msCrypto nor window.crypto is defined in window`)
    return Math.random()
}

function getSecureMathRandomServer() {
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

export default function getSecureMathRandom() {
    try {
        if (typeof window === 'undefined') {
            return getSecureMathRandomServer()
        } else {
            return getSecureMathRandomBrowser()
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(`fail to generate secure random reason: ${e}`)
    }

    return Math.random()
}
