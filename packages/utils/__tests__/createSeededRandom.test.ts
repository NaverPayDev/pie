import createSeededRandom from '../src/utils/createSeededRandom'

describe('createSeededRandom', () => {
    test('생성된 난수 값은 0과 1 사이다.', () => {
        const random = createSeededRandom(new Date().getTime())

        for (let i = 0; i < 100; i++) {
            const randomNumber = random()
            expect(randomNumber).toBeGreaterThanOrEqual(0)
            expect(randomNumber).toBeLessThan(1)
        }
    })

    test('동일한 seed number에서는 항상 같은 난수를 생성한다.', () => {
        for (let i = 0; i < 100; i++) {
            const seedNumber = new Date().getTime()
            const random1 = createSeededRandom(seedNumber)
            const random2 = createSeededRandom(seedNumber)
            expect(random1()).toEqual(random2())
        }
    })
})
