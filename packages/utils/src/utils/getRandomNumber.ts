import getSecureMathRandom from './getSecureMathRandom'

/**
 * 0부터 max-1의 숫자 중 랜덤한 숫자를 반환합니다.
 *
 * @param max
 * @returns 랜덤 숫자
 */
export default function getRandomNumber(max: number) {
    return Math.floor(getSecureMathRandom() * max)
}
