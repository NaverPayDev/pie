import {beforeAll, describe, test, expect, it} from 'vitest'

import {URLParamCompressor} from './URLParamCompressor'

const compressor = new URLParamCompressor({debug: true})

describe('Test with long url', () => {
    const redirectUrls = {
        rurl: 'https%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Ffds%252Fauth%252FkeypadSuccess%253Faction%253DREPLACE%2526rurl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Fapply%252Fshopn%252F2025031282074571%252F2025031282074571%2526surl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252F443c0630-0505-1a01-d19c-d058401cefc8%253FbackUrl%253Dhttps%25253A%25252F%25252Fproduct.shoppinglive.naver.com%25252Fproducts%25252F11364953053%25253FNaPm%25253Dct%2525253Dm85vd8dp%2525257Cci%2525253Dshopn%2525257Ctr%2525253Dlim5%2525257Chk%2525253D489dc88bc28518bc226b9042238b545b141afd74%2525257Ctrx%2525253D1574969_1%252526nt_source%25253Dnshoplive%252526nt_medium%25253D1574969%252526nt_detail%25253Donair%252526nt_keyword%25253Dshoppinglive%252526prdFrom%25253Db_1574969%252526extras%25253D%2525257B%25252522entryInfo%25252522%2525253A%2525257B%25252522sourceId%25252522%2525253A%252525221574969%25252522%2525252C%25252522sourceType%25252522%2525253A%25252522BROADCAST%25252522%2525252C%25252522externalId%25252522%2525253A%25252522shoppinglive%25252522%2525252C%25252522externalServiceType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522tr%25252522%2525253A%25252522lim5%25252522%2525252C%25252522trx%25252522%2525253A%252525221574969_1%25252522%2525252C%25252522fm%25252522%2525253Anull%2525252C%25252522sn%25252522%2525253Anull%2525252C%25252522ea%25252522%2525253Anull%2525252C%25252522returnParams%25252522%2525253A%25252522%2525257B%2525257D%25252522%2525252C%25252522slAccountType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522slAccountId%25252522%2525253A%25252522d7reO%25252522%2525252C%25252522commissionType%25252522%2525253Anull%2525252C%25252522thirdPartyInfoAgreementType%25252522%2525253Anull%2525257D%2525257D%252526header%25253Dfalse%2526nl-au%253D72b8fa00d4844155bd16c5682f869759',
        surl: 'https%3A%2F%2Forders.pay.naver.com%2Fordersheet%2Fseller%2Ffds%2Fauth%2FkeypadFail%3Faction%3DREPLACE%26rurl%3Dhttps%3A%2F%2Forders.pay.naver.com%2Fordersheet%2Fseller%2Fapply%2Fshopn%2F2025031282074571%2F2025031282074571%26surl%3Dhttps%3A%2F%2Forders.pay.naver.com%2Fordersheet%2Fseller%2F443c0630-0505-1a01-d19c-d058401cefc8%3FbackUrl%3Dhttps%253A%252F%252Fproduct.shoppinglive.naver.com%252Fproducts%252F11364953053%253FNaPm%253Dct%25253Dm85vd8dp%25257Cci%25253Dshopn%25257Ctr%25253Dlim5%25257Chk%25253D489dc88bc28518bc226b9042238b545b141afd74%25257Ctrx%25253D1574969_1%2526nt_source%253Dnshoplive%2526nt_medium%253D1574969%2526nt_detail%253Donair%2526nt_keyword%253Dshoppinglive%2526prdFrom%253Db_1574969%2526extras%253D%25257B%252522entryInfo%252522%25253A%25257B%252522sourceId%252522%25253A%2525221574969%252522%25252C%252522sourceType%252522%25253A%252522BROADCAST%252522%25252C%252522externalId%252522%25253A%252522shoppinglive%252522%25252C%252522externalServiceType%252522%25253A%252522NAVER%252522%25252C%252522tr%252522%25253A%252522lim5%252522%25252C%252522trx%252522%25253A%2525221574969_1%252522%25252C%252522fm%252522%25253Anull%25252C%252522sn%252522%25253Anull%25252C%252522ea%252522%25253Anull%25252C%252522returnParams%252522%25253A%252522%25257B%25257D%252522%25252C%252522slAccountType%252522%25253A%252522NAVER%252522%25252C%252522slAccountId%252522%25253A%252522d7reO%252522%25252C%252522commissionType%252522%25253Anull%25252C%252522thirdPartyInfoAgreementType%252522%25253Anull%25257D%25257D%2526header%253Dfalse%26nl-au%3D72b8fa00d4844155bd16c5682f869759',
    }

    test('원본 url로 복원한다.', () => {
        const {result, isCompressed} = compressor.compress(redirectUrls)
        const originalUrl = compressor.decompress(result)

        expect(originalUrl).toEqual(redirectUrls)
        expect(isCompressed).toBe(true)
    })
})

describe('Test with short url', () => {
    test('압축 결과가 원본보다 용량이 더 크다면, 압축하지 않는다', () => {
        const redirectUrls = {
            rurl: 'https%3A%2F%2Fnaver.com',
        }

        const {result, isCompressed} = compressor.compress(redirectUrls)

        expect(result).toBe(new URLSearchParams(redirectUrls).toString())
        expect(isCompressed).toBe(false)
    })
})

describe('Invalid data', () => {
    test('유효하지 않은 데이터라면 null을 반환한다.', () => {
        const result = compressor.decompress('abcdefg')

        expect(result).toEqual(null)
    })
})

describe('Get specific param', () => {
    const redirectUrls = {
        rurl: 'https%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Ffds%252Fauth%252FkeypadSuccess%253Faction%253DREPLACE%2526rurl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Fapply%252Fshopn%252F2025031282074571%252F2025031282074571%2526surl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252F443c0630-0505-1a01-d19c-d058401cefc8%253FbackUrl%253Dhttps%25253A%25252F%25252Fproduct.shoppinglive.naver.com%25252Fproducts%25252F11364953053%25253FNaPm%25253Dct%2525253Dm85vd8dp%2525257Cci%2525253Dshopn%2525257Ctr%2525253Dlim5%2525257Chk%2525253D489dc88bc28518bc226b9042238b545b141afd74%2525257Ctrx%2525253D1574969_1%252526nt_source%25253Dnshoplive%252526nt_medium%25253D1574969%252526nt_detail%25253Donair%252526nt_keyword%25253Dshoppinglive%252526prdFrom%25253Db_1574969%252526extras%25253D%2525257B%25252522entryInfo%25252522%2525253A%2525257B%25252522sourceId%25252522%2525253A%252525221574969%25252522%2525252C%25252522sourceType%25252522%2525253A%25252522BROADCAST%25252522%2525252C%25252522externalId%25252522%2525253A%25252522shoppinglive%25252522%2525252C%25252522externalServiceType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522tr%25252522%2525253A%25252522lim5%25252522%2525252C%25252522trx%25252522%2525253A%252525221574969_1%25252522%2525252C%25252522fm%25252522%2525253Anull%2525252C%25252522sn%25252522%2525253Anull%2525252C%25252522ea%25252522%2525253Anull%2525252C%25252522returnParams%25252522%2525253A%25252522%2525257B%2525257D%25252522%2525252C%25252522slAccountType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522slAccountId%25252522%2525253A%25252522d7reO%25252522%2525252C%25252522commissionType%25252522%2525253Anull%2525252C%25252522thirdPartyInfoAgreementType%25252522%2525253Anull%2525257D%2525257D%252526header%25253Dfalse%2526nl-au%253D72b8fa00d4844155bd16c5682f869759',
        surl: 'https%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Ffds%252Fauth%252FkeypadFail%253Faction%253DREPLACE%2526rurl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Fapply%252Fshopn%252F2025031282074571%252F2025031282074571%2526surl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252F443c0630-0505-1a01-d19c-d058401cefc8%253FbackUrl%253Dhttps%25253A%25252F%25252Fproduct.shoppinglive.naver.com%25252Fproducts%25252F11364953053%25253FNaPm%25253Dct%2525253Dm85vd8dp%2525257Cci%2525253Dshopn%2525257Ctr%2525253Dlim5%2525257Chk%2525253D489dc88bc28518bc226b9042238b545b141afd74%2525257Ctrx%2525253D1574969_1%252526nt_source%25253Dnshoplive%252526nt_medium%25253D1574969%252526nt_detail%25253Donair%252526nt_keyword%25253Dshoppinglive%252526prdFrom%25253Db_1574969%252526extras%25253D%2525257B%25252522entryInfo%25252522%2525253A%2525257B%25252522sourceId%25252522%2525253A%252525221574969%25252522%2525252C%25252522sourceType%25252522%2525253A%25252522BROADCAST%25252522%2525252C%25252522externalId%25252522%2525253A%25252522shoppinglive%25252522%2525252C%25252522externalServiceType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522tr%25252522%2525253A%25252522lim5%25252522%2525252C%25252522trx%25252522%2525253A%252525221574969_1%25252522%2525252C%25252522fm%25252522%2525253Anull%2525252C%25252522sn%25252522%2525253Anull%2525252C%25252522ea%25252522%2525253Anull%2525252C%25252522returnParams%25252522%2525253A%25252522%2525257B%2525257D%25252522%2525252C%25252522slAccountType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522slAccountId%25252522%2525253A%25252522d7reO%25252522%2525252C%25252522commissionType%25252522%2525253Anull%2525252C%25252522thirdPartyInfoAgreementType%25252522%2525253Anull%2525257D%2525257D%252526header%25253Dfalse%2526nl-au%253D72b8fa00d4844155bd16c5682f869759',
    }

    let compressed = ''
    beforeAll(() => {
        const {result} = compressor.compress(redirectUrls)
        compressed = result
    })

    test('특정 key를 정확하게 가져온다.', () => {
        compressor.decompress(compressed)
        const result = compressor.get(compressed, 'rurl')
        expect(result).toBe(redirectUrls.rurl)

        const redirectUrls2 = {
            surl: 'https%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Ffds%252Fauth%252FkeypadFail%253Faction%253DREPLACE%2526rurl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Fapply%252Fshopn%252F2025031282074571%252F2025031282074571%2526surl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252F443c0630-0505-1a01-d19c-d058401cefc8%253FbackUrl%253Dhttps%25253A%25252F%25252Fproduct.shoppinglive.naver.com%25252Fproducts%25252F11364953053%25253FNaPm%25253Dct%2525253Dm85vd8dp%2525257Cci%2525253Dshopn%2525257Ctr%2525253Dlim5%2525257Chk%2525253D489dc88bc28518bc226b9042238b545b141afd74%2525257Ctrx%2525253D1574969_1%252526nt_source%25253Dnshoplive%252526nt_medium%25253D1574969%252526nt_detail%25253Donair%252526nt_keyword%25253Dshoppinglive%252526prdFrom%25253Db_1574969%252526extras%25253D%2525257B%25252522entryInfo%25252522%2525253A%2525257B%25252522sourceId%25252522%2525253A%252525221574969%25252522%2525252C%25252522sourceType%25252522%2525253A%25252522BROADCAST%25252522%2525252C%25252522externalId%25252522%2525253A%25252522shoppinglive%25252522%2525252C%25252522externalServiceType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522tr%25252522%2525253A%25252522lim5%25252522%2525252C%25252522trx%25252522%2525253A%252525221574969_1%25252522%2525252C%25252522fm%25252522%2525253Anull%2525252C%25252522sn%25252522%2525253Anull%2525252C%25252522ea%25252522%2525253Anull%2525252C%25252522returnParams%25252522%2525253A%25252522%2525257B%2525257D%25252522%2525252C%25252522slAccountType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522slAccountId%25252522%2525253A%25252522d7reO%25252522%2525252C%25252522commissionType%25252522%2525253Anull%2525252C%25252522thirdPartyInfoAgreementType%25252522%2525253Anull%2525257D%2525257D%252526header%25253Dfalse%2526nl-au%253D72b8fa00d4844155bd16c5682f869759',
        }

        const {result: compressed2} = compressor.compress(redirectUrls2)
        const result2 = compressor.get(compressed2, 'surl')
        expect(result2).toBe(redirectUrls.surl)
    })

    test('해당하는 key가 없다면 undefined를 리턴한다.', () => {
        compressor.decompress(compressed)
        const result = compressor.get(compressed, 'furl')
        expect(result).toBe(undefined)
    })

    test('유효하지 않은 데이터라면 undefined를 반환한다.', () => {
        const result = compressor.get('abcdefg', 'a')

        expect(result).toEqual(undefined)
    })
})

describe('URLParamCompressor 페이지 네비게이션 시나리오', () => {
    describe('기본 네비게이션: example.com → next1 → next2 → next3', () => {
        it('각 단계별 압축과 해제가 정상 동작함', () => {
            // 1→2단계: 홈페이지 정보 압축
            const step2Data = {
                rurl: 'https://example.com',
                surl: 'https://example.com',
            }
            const {result: step2Compressed} = compressor.compress(step2Data)
            const step2Restored = compressor.decompress(step2Compressed)

            expect(step2Restored).not.toBe(null)
            if (step2Restored === null) {
                return
            }

            expect(step2Restored.rurl).toBe('https://example.com')
            expect(step2Restored.surl).toBe('https://example.com')

            const step2FullUrl = `https://example.com/next1?rurl=${encodeURIComponent(
                'https://example.com',
            )}&surl=${encodeURIComponent('https://example.com')}`
            const step3Data = {
                rurl: step2FullUrl,
                surl: step2FullUrl,
            }
            const {result: step3Compressed} = compressor.compress(step3Data)
            const step3Restored = compressor.decompress(step3Compressed)

            expect(step3Restored).not.toBe(null)
            if (step3Restored === null) {
                return
            }

            expect(step3Restored.rurl).toBe(step2FullUrl)
            expect(step3Restored.surl).toBe(step2FullUrl)

            const step3FullUrl = `https://example.com/next1/next2?rurl=${encodeURIComponent(
                step2FullUrl,
            )}&surl=${encodeURIComponent(step2FullUrl)}`
            const step4Data = {
                rurl: step3FullUrl,
                surl: step3FullUrl,
            }
            const {result: step4Compressed} = compressor.compress(step4Data)
            const step4Restored = compressor.decompress(step4Compressed)

            expect(step4Restored).not.toBe(null)
            if (step4Restored === null) {
                return
            }

            expect(step4Restored.rurl).toBe(step3FullUrl)
            expect(step4Restored.surl).toBe(step3FullUrl)
        })

        it('복잡한 쿼리 데이터도 압축/해제됨', () => {
            const baseUrl = 'https://shop.com/products'
            const queryParams = 'category=electronics&brand=apple&price=1000-3000&sort=price&page=2'
            const fullUrl = `${baseUrl}?${queryParams}`

            const complexData = {
                rurl: fullUrl,
                surl: fullUrl,
                productId: 'macbook-pro-m3',
                selectedColor: 'space-gray',
                selectedStorage: '512gb',
                userPrefs: JSON.stringify({theme: 'dark', currency: 'USD'}),
                searchHistory: JSON.stringify(['laptop', 'macbook', 'apple computer']),
            }

            const {result: compressed} = compressor.compress(complexData)
            const restored = compressor.decompress(compressed)

            expect(restored).toEqual(complexData)
        })

        it('중첩된 히스토리에서 이전 페이지 정보 추출 가능', () => {
            // 3단계 네비게이션 후 역추적
            const originalPage = 'https://example.com'

            const step2Data = {rurl: originalPage, surl: originalPage}
            const {result: step2Compressed} = compressor.compress(step2Data)

            const step2Restored = compressor.decompress(step2Compressed)

            expect(step2Restored).not.toBe(null)
            if (step2Restored === null) {
                return
            }

            const step2FullUrl = `https://example.com/next1?rurl=${encodeURIComponent(
                step2Restored.rurl!,
            )}&surl=${encodeURIComponent(step2Restored.surl!)}`
            const step3Data = {rurl: step2FullUrl, surl: step2FullUrl}
            const {result: step3Compressed} = compressor.compress(step3Data)

            // step3에서 이전 페이지 정보 추출
            const step3Restored = compressor.decompress(step3Compressed)

            expect(step3Restored).not.toBe(null)
            if (step3Restored === null) {
                return
            }

            const step2Params = new URLSearchParams(step3Restored.rurl!.split('?')[1])

            expect(step2Params.get('rurl')).toBe(originalPage)
            expect(step2Params.get('surl')).toBe(originalPage)
        })
    })
})
