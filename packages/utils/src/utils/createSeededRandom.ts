/**
 * @description LCG에서 가장 널리쓰이는 상수 값 선정. 자바스크립트 내에서 안전한 2^31 이내에서 선정
 * @see https://softwareengineering.stackexchange.com/questions/260969/original-source-of-seed-9301-49297-233280-random-algorithm
 * @see https://www.unf.edu/~cwinton/html/cop4300/s09/class.notes/LCGinfo.pdf
 */
const multiplier = 9301
const increment = 49297
const modulus = 233280

/**
 * @description 선형 합동 생성기 Linear Congruential Generator, LCG 를 사용하여 시드값을 기반으로 랜덤값을 생성합니다. 함수 실행마다 새로운 랜덤값을 생성하지만, 이 값들은 seed가 동일하다면 모두 동일합니다.
 * @warning 이 seed 난수 생성기는 안정성이 검증된 알고리즘이 아닙니다. (그냥 구현하기 제일 용이한 알고리즘) 난수가 중요한 경우라면 getSecureMathRandom 를 사용해주세요.
 * @see https://en.wikipedia.org/wiki/Linear_congruential_generator
 */
function createSeededRandom(initialSeed: number) {
    let seed = initialSeed

    return function () {
        seed = (seed * multiplier + increment) % modulus
        return seed / modulus
    }
}

export default createSeededRandom
