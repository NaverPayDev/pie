import {getSecureMathRandomBrowser} from './getSecureMathRandom/browser'
import {getSecureMathRandomServer} from './getSecureMathRandom/server'

declare global {
    interface Window {
        msCrypto: Crypto
    }
}

/**
 * @description 보안 취약점이 있는 Math.random 대신, 안전한 난수 생성 방식을 사용하여 랜덤값을 반환합니다. 랜덤 값은 기존 Math.random() 과 동일하게 0~1 사이로 생성됩니다.
 * @see https://yceffort.kr/2021/09/javascript-random-number#mathrandom의-보안-취약점
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
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
