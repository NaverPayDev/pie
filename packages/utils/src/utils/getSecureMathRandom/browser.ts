declare global {
    interface Window {
        msCrypto: Crypto
    }
}

export function getSecureMathRandomBrowser() {
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
