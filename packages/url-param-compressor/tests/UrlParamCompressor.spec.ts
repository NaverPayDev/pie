import {test, expect} from '@playwright/test'

import {URLParamCompressor} from '../src/URLParamCompressor'

declare global {
    interface Window {
        compress: (data: Record<string, string>) => {
            result: string
            isCompressed: boolean
        }
        decompress: (data: string) => Record<string, string> | null
        get: (compressed: string, key: string) => string | undefined
    }
}

test.beforeEach(async ({page}) => {
    await page.goto('about:blank')

    await page.exposeFunction('compress', (data: Record<string, string>) => {
        const compressor = new URLParamCompressor({debug: true})

        return compressor.compress(data)
    })

    await page.exposeFunction('decompress', (data: string) => {
        const compressor = new URLParamCompressor({debug: true})

        return compressor.decompress(data)
    })

    await page.exposeFunction('get', (compressed: string, key: string) => {
        const compressor = new URLParamCompressor({debug: true})

        return compressor.get(compressed, key)
    })
})

test('Test with long url', async ({page}) => {
    const result = await page.evaluate(async () => {
        const redirectUrls = {
            rurl: 'https%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Ffds%252Fauth%252FkeypadSuccess%253Faction%253DREPLACE%2526rurl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Fapply%252Fshopn%252F2025031282074571%252F2025031282074571%2526surl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252F443c0630-0505-1a01-d19c-d058401cefc8%253FbackUrl%253Dhttps%25253A%25252F%25252Fproduct.shoppinglive.naver.com%25252Fproducts%25252F11364953053%25253FNaPm%25253Dct%2525253Dm85vd8dp%2525257Cci%2525253Dshopn%2525257Ctr%2525253Dlim5%2525257Chk%2525253D489dc88bc28518bc226b9042238b545b141afd74%2525257Ctrx%2525253D1574969_1%252526nt_source%25253Dnshoplive%252526nt_medium%25253D1574969%252526nt_detail%25253Donair%252526nt_keyword%25253Dshoppinglive%252526prdFrom%25253Db_1574969%252526extras%25253D%2525257B%25252522entryInfo%25252522%2525253A%2525257B%25252522sourceId%25252522%2525253A%252525221574969%25252522%2525252C%25252522sourceType%25252522%2525253A%25252522BROADCAST%25252522%2525252C%25252522externalId%25252522%2525253A%25252522shoppinglive%25252522%2525252C%25252522externalServiceType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522tr%25252522%2525253A%25252522lim5%25252522%2525252C%25252522trx%25252522%2525253A%252525221574969_1%25252522%2525252C%25252522fm%25252522%2525253Anull%2525252C%25252522sn%25252522%2525253Anull%2525252C%25252522ea%25252522%2525253Anull%2525252C%25252522returnParams%25252522%2525253A%25252522%2525257B%2525257D%25252522%2525252C%25252522slAccountType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522slAccountId%25252522%2525253A%25252522d7reO%25252522%2525252C%25252522commissionType%25252522%2525253Anull%2525252C%25252522thirdPartyInfoAgreementType%25252522%2525253Anull%2525257D%2525257D%252526header%25253Dfalse%2526nl-au%253D72b8fa00d4844155bd16c5682f869759',
            surl: 'https%3A%2F%2Forders.pay.naver.com%2Fordersheet%2Fseller%2Ffds%2Fauth%2FkeypadFail%3Faction%3DREPLACE%26rurl%3Dhttps%3A%2F%2Forders.pay.naver.com%2Fordersheet%2Fseller%2Fapply%2Fshopn%2F2025031282074571%2F2025031282074571%26surl%3Dhttps%3A%2F%2Forders.pay.naver.com%2Fordersheet%2Fseller%2F443c0630-0505-1a01-d19c-d058401cefc8%3FbackUrl%3Dhttps%253A%252F%252Fproduct.shoppinglive.naver.com%252Fproducts%252F11364953053%253FNaPm%253Dct%25253Dm85vd8dp%25257Cci%25253Dshopn%25257Ctr%25253Dlim5%25257Chk%25253D489dc88bc28518bc226b9042238b545b141afd74%25257Ctrx%25253D1574969_1%2526nt_source%253Dnshoplive%2526nt_medium%253D1574969%2526nt_detail%253Donair%2526nt_keyword%253Dshoppinglive%2526prdFrom%253Db_1574969%2526extras%253D%25257B%252522entryInfo%252522%25253A%25257B%252522sourceId%252522%25253A%2525221574969%252522%25252C%252522sourceType%252522%25253A%252522BROADCAST%252522%25252C%252522externalId%252522%25253A%252522shoppinglive%252522%25252C%252522externalServiceType%252522%25253A%252522NAVER%252522%25252C%252522tr%252522%25253A%252522lim5%252522%25252C%252522trx%252522%25253A%2525221574969_1%252522%25252C%252522fm%252522%25253Anull%25252C%252522sn%252522%25253Anull%25252C%252522ea%252522%25253Anull%25252C%252522returnParams%252522%25253A%252522%25257B%25257D%252522%25252C%252522slAccountType%252522%25253A%252522NAVER%252522%25252C%252522slAccountId%252522%25253A%252522d7reO%252522%25252C%252522commissionType%252522%25253Anull%25252C%252522thirdPartyInfoAgreementType%252522%25253Anull%25257D%25257D%2526header%253Dfalse%26nl-au%3D72b8fa00d4844155bd16c5682f869759',
        }

        const {result: compressed, isCompressed} = await window.compress(redirectUrls)
        const originalUrl = await window.decompress(compressed)

        return {
            isCompressed,
            decompressed: originalUrl,
        }
    })

    expect(result.isCompressed).toBe(true)
    expect(result.decompressed).toEqual({
        rurl: 'https%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Ffds%252Fauth%252FkeypadSuccess%253Faction%253DREPLACE%2526rurl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Fapply%252Fshopn%252F2025031282074571%252F2025031282074571%2526surl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252F443c0630-0505-1a01-d19c-d058401cefc8%253FbackUrl%253Dhttps%25253A%25252F%25252Fproduct.shoppinglive.naver.com%25252Fproducts%25252F11364953053%25253FNaPm%25253Dct%2525253Dm85vd8dp%2525257Cci%2525253Dshopn%2525257Ctr%2525253Dlim5%2525257Chk%2525253D489dc88bc28518bc226b9042238b545b141afd74%2525257Ctrx%2525253D1574969_1%252526nt_source%25253Dnshoplive%252526nt_medium%25253D1574969%252526nt_detail%25253Donair%252526nt_keyword%25253Dshoppinglive%252526prdFrom%25253Db_1574969%252526extras%25253D%2525257B%25252522entryInfo%25252522%2525253A%2525257B%25252522sourceId%25252522%2525253A%252525221574969%25252522%2525252C%25252522sourceType%25252522%2525253A%25252522BROADCAST%25252522%2525252C%25252522externalId%25252522%2525253A%25252522shoppinglive%25252522%2525252C%25252522externalServiceType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522tr%25252522%2525253A%25252522lim5%25252522%2525252C%25252522trx%25252522%2525253A%252525221574969_1%25252522%2525252C%25252522fm%25252522%2525253Anull%2525252C%25252522sn%25252522%2525253Anull%2525252C%25252522ea%25252522%2525253Anull%2525252C%25252522returnParams%25252522%2525253A%25252522%2525257B%2525257D%25252522%2525252C%25252522slAccountType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522slAccountId%25252522%2525253A%25252522d7reO%25252522%2525252C%25252522commissionType%25252522%2525253Anull%2525252C%25252522thirdPartyInfoAgreementType%25252522%2525253Anull%2525257D%2525257D%252526header%25253Dfalse%2526nl-au%253D72b8fa00d4844155bd16c5682f869759',
        surl: 'https%3A%2F%2Forders.pay.naver.com%2Fordersheet%2Fseller%2Ffds%2Fauth%2FkeypadFail%3Faction%3DREPLACE%26rurl%3Dhttps%3A%2F%2Forders.pay.naver.com%2Fordersheet%2Fseller%2Fapply%2Fshopn%2F2025031282074571%2F2025031282074571%26surl%3Dhttps%3A%2F%2Forders.pay.naver.com%2Fordersheet%2Fseller%2F443c0630-0505-1a01-d19c-d058401cefc8%3FbackUrl%3Dhttps%253A%252F%252Fproduct.shoppinglive.naver.com%252Fproducts%252F11364953053%253FNaPm%253Dct%25253Dm85vd8dp%25257Cci%25253Dshopn%25257Ctr%25253Dlim5%25257Chk%25253D489dc88bc28518bc226b9042238b545b141afd74%25257Ctrx%25253D1574969_1%2526nt_source%253Dnshoplive%2526nt_medium%253D1574969%2526nt_detail%253Donair%2526nt_keyword%253Dshoppinglive%2526prdFrom%253Db_1574969%2526extras%253D%25257B%252522entryInfo%252522%25253A%25257B%252522sourceId%252522%25253A%2525221574969%252522%25252C%252522sourceType%252522%25253A%252522BROADCAST%252522%25252C%252522externalId%252522%25253A%252522shoppinglive%252522%25252C%252522externalServiceType%252522%25253A%252522NAVER%252522%25252C%252522tr%252522%25253A%252522lim5%252522%25252C%252522trx%252522%25253A%2525221574969_1%252522%25252C%252522fm%252522%25253Anull%25252C%252522sn%252522%25253Anull%25252C%252522ea%252522%25253Anull%25252C%252522returnParams%252522%25253A%252522%25257B%25257D%252522%25252C%252522slAccountType%252522%25253A%252522NAVER%252522%25252C%252522slAccountId%252522%25253A%252522d7reO%252522%25252C%252522commissionType%252522%25253Anull%25252C%252522thirdPartyInfoAgreementType%252522%25253Anull%25257D%25257D%2526header%253Dfalse%26nl-au%3D72b8fa00d4844155bd16c5682f869759',
    })
})

test('압축 결과가 원본보다 용량이 더 크다면, 압축하지 않는다', async ({page}) => {
    const result = await page.evaluate(async () => {
        const redirectUrls = {
            rurl: 'https%3A%2F%2Fnaver.com',
        }

        const {result: compressed, isCompressed} = await window.compress(redirectUrls)

        return {compressed, isCompressed}
    })

    expect(result.compressed).toBe(
        new URLSearchParams({
            rurl: 'https%3A%2F%2Fnaver.com',
        }).toString(),
    )
    expect(result.isCompressed).toBe(false)
})

test('유효하지 않은 데이터라면 빈 객체를 반환한다.', async ({page}) => {
    const result = await page.evaluate(async () => {
        return await window.decompress('abcdefg')
    })

    expect(result).toEqual(null)
})

test.describe('Get specific param', () => {
    // let compressed = ''
    // test.beforeAll(() => {
    //     const {result} = compressor.compress(redirectUrls)
    //     compressed = result
    // })

    test('특정 key를 정확하게 가져온다.', async ({page}) => {
        const result = await page.evaluate(async () => {
            const redirectUrls = {
                rurl: 'https%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Ffds%252Fauth%252FkeypadSuccess%253Faction%253DREPLACE%2526rurl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Fapply%252Fshopn%252F2025031282074571%252F2025031282074571%2526surl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252F443c0630-0505-1a01-d19c-d058401cefc8%253FbackUrl%253Dhttps%25253A%25252F%25252Fproduct.shoppinglive.naver.com%25252Fproducts%25252F11364953053%25253FNaPm%25253Dct%2525253Dm85vd8dp%2525257Cci%2525253Dshopn%2525257Ctr%2525253Dlim5%2525257Chk%2525253D489dc88bc28518bc226b9042238b545b141afd74%2525257Ctrx%2525253D1574969_1%252526nt_source%25253Dnshoplive%252526nt_medium%25253D1574969%252526nt_detail%25253Donair%252526nt_keyword%25253Dshoppinglive%252526prdFrom%25253Db_1574969%252526extras%25253D%2525257B%25252522entryInfo%25252522%2525253A%2525257B%25252522sourceId%25252522%2525253A%252525221574969%25252522%2525252C%25252522sourceType%25252522%2525253A%25252522BROADCAST%25252522%2525252C%25252522externalId%25252522%2525253A%25252522shoppinglive%25252522%2525252C%25252522externalServiceType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522tr%25252522%2525253A%25252522lim5%25252522%2525252C%25252522trx%25252522%2525253A%252525221574969_1%25252522%2525252C%25252522fm%25252522%2525253Anull%2525252C%25252522sn%25252522%2525253Anull%2525252C%25252522ea%25252522%2525253Anull%2525252C%25252522returnParams%25252522%2525253A%25252522%2525257B%2525257D%25252522%2525252C%25252522slAccountType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522slAccountId%25252522%2525253A%25252522d7reO%25252522%2525252C%25252522commissionType%25252522%2525253Anull%2525252C%25252522thirdPartyInfoAgreementType%25252522%2525253Anull%2525257D%2525257D%252526header%25253Dfalse%2526nl-au%253D72b8fa00d4844155bd16c5682f869759',
                surl: 'https%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Ffds%252Fauth%252FkeypadFail%253Faction%253DREPLACE%2526rurl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Fapply%252Fshopn%252F2025031282074571%252F2025031282074571%2526surl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252F443c0630-0505-1a01-d19c-d058401cefc8%253FbackUrl%253Dhttps%25253A%25252F%25252Fproduct.shoppinglive.naver.com%25252Fproducts%25252F11364953053%25253FNaPm%25253Dct%2525253Dm85vd8dp%2525257Cci%2525253Dshopn%2525257Ctr%2525253Dlim5%2525257Chk%2525253D489dc88bc28518bc226b9042238b545b141afd74%2525257Ctrx%2525253D1574969_1%252526nt_source%25253Dnshoplive%252526nt_medium%25253D1574969%252526nt_detail%25253Donair%252526nt_keyword%25253Dshoppinglive%252526prdFrom%25253Db_1574969%252526extras%25253D%2525257B%25252522entryInfo%25252522%2525253A%2525257B%25252522sourceId%25252522%2525253A%252525221574969%25252522%2525252C%25252522sourceType%25252522%2525253A%25252522BROADCAST%25252522%2525252C%25252522externalId%25252522%2525253A%25252522shoppinglive%25252522%2525252C%25252522externalServiceType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522tr%25252522%2525253A%25252522lim5%25252522%2525252C%25252522trx%25252522%2525253A%252525221574969_1%25252522%2525252C%25252522fm%25252522%2525253Anull%2525252C%25252522sn%25252522%2525253Anull%2525252C%25252522ea%25252522%2525253Anull%2525252C%25252522returnParams%25252522%2525253A%25252522%2525257B%2525257D%25252522%2525252C%25252522slAccountType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522slAccountId%25252522%2525253A%25252522d7reO%25252522%2525252C%25252522commissionType%25252522%2525253Anull%2525252C%25252522thirdPartyInfoAgreementType%25252522%2525253Anull%2525257D%2525257D%252526header%25253Dfalse%2526nl-au%253D72b8fa00d4844155bd16c5682f869759',
            }
            const {result: compressed} = await window.compress(redirectUrls)

            await window.decompress(compressed)
            const rurl = await window.get(compressed, 'rurl')
            const surl = await window.get(compressed, 'surl')

            return {rurl, surl}
        })

        expect(result.rurl).toBe(
            'https%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Ffds%252Fauth%252FkeypadSuccess%253Faction%253DREPLACE%2526rurl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Fapply%252Fshopn%252F2025031282074571%252F2025031282074571%2526surl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252F443c0630-0505-1a01-d19c-d058401cefc8%253FbackUrl%253Dhttps%25253A%25252F%25252Fproduct.shoppinglive.naver.com%25252Fproducts%25252F11364953053%25253FNaPm%25253Dct%2525253Dm85vd8dp%2525257Cci%2525253Dshopn%2525257Ctr%2525253Dlim5%2525257Chk%2525253D489dc88bc28518bc226b9042238b545b141afd74%2525257Ctrx%2525253D1574969_1%252526nt_source%25253Dnshoplive%252526nt_medium%25253D1574969%252526nt_detail%25253Donair%252526nt_keyword%25253Dshoppinglive%252526prdFrom%25253Db_1574969%252526extras%25253D%2525257B%25252522entryInfo%25252522%2525253A%2525257B%25252522sourceId%25252522%2525253A%252525221574969%25252522%2525252C%25252522sourceType%25252522%2525253A%25252522BROADCAST%25252522%2525252C%25252522externalId%25252522%2525253A%25252522shoppinglive%25252522%2525252C%25252522externalServiceType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522tr%25252522%2525253A%25252522lim5%25252522%2525252C%25252522trx%25252522%2525253A%252525221574969_1%25252522%2525252C%25252522fm%25252522%2525253Anull%2525252C%25252522sn%25252522%2525253Anull%2525252C%25252522ea%25252522%2525253Anull%2525252C%25252522returnParams%25252522%2525253A%25252522%2525257B%2525257D%25252522%2525252C%25252522slAccountType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522slAccountId%25252522%2525253A%25252522d7reO%25252522%2525252C%25252522commissionType%25252522%2525253Anull%2525252C%25252522thirdPartyInfoAgreementType%25252522%2525253Anull%2525257D%2525257D%252526header%25253Dfalse%2526nl-au%253D72b8fa00d4844155bd16c5682f869759',
        )
        expect(result.surl).toBe(
            'https%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Ffds%252Fauth%252FkeypadFail%253Faction%253DREPLACE%2526rurl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Fapply%252Fshopn%252F2025031282074571%252F2025031282074571%2526surl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252F443c0630-0505-1a01-d19c-d058401cefc8%253FbackUrl%253Dhttps%25253A%25252F%25252Fproduct.shoppinglive.naver.com%25252Fproducts%25252F11364953053%25253FNaPm%25253Dct%2525253Dm85vd8dp%2525257Cci%2525253Dshopn%2525257Ctr%2525253Dlim5%2525257Chk%2525253D489dc88bc28518bc226b9042238b545b141afd74%2525257Ctrx%2525253D1574969_1%252526nt_source%25253Dnshoplive%252526nt_medium%25253D1574969%252526nt_detail%25253Donair%252526nt_keyword%25253Dshoppinglive%252526prdFrom%25253Db_1574969%252526extras%25253D%2525257B%25252522entryInfo%25252522%2525253A%2525257B%25252522sourceId%25252522%2525253A%252525221574969%25252522%2525252C%25252522sourceType%25252522%2525253A%25252522BROADCAST%25252522%2525252C%25252522externalId%25252522%2525253A%25252522shoppinglive%25252522%2525252C%25252522externalServiceType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522tr%25252522%2525253A%25252522lim5%25252522%2525252C%25252522trx%25252522%2525253A%252525221574969_1%25252522%2525252C%25252522fm%25252522%2525253Anull%2525252C%25252522sn%25252522%2525253Anull%2525252C%25252522ea%25252522%2525253Anull%2525252C%25252522returnParams%25252522%2525253A%25252522%2525257B%2525257D%25252522%2525252C%25252522slAccountType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522slAccountId%25252522%2525253A%25252522d7reO%25252522%2525252C%25252522commissionType%25252522%2525253Anull%2525252C%25252522thirdPartyInfoAgreementType%25252522%2525253Anull%2525257D%2525257D%252526header%25253Dfalse%2526nl-au%253D72b8fa00d4844155bd16c5682f869759',
        )
    })

    test('해당하는 key가 없다면 undefined를 리턴한다.', async ({page}) => {
        const result = await page.evaluate(async () => {
            const redirectUrls = {
                rurl: 'https%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Ffds%252Fauth%252FkeypadSuccess%253Faction%253DREPLACE%2526rurl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Fapply%252Fshopn%252F2025031282074571%252F2025031282074571%2526surl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252F443c0630-0505-1a01-d19c-d058401cefc8%253FbackUrl%253Dhttps%25253A%25252F%25252Fproduct.shoppinglive.naver.com%25252Fproducts%25252F11364953053%25253FNaPm%25253Dct%2525253Dm85vd8dp%2525257Cci%2525253Dshopn%2525257Ctr%2525253Dlim5%2525257Chk%2525253D489dc88bc28518bc226b9042238b545b141afd74%2525257Ctrx%2525253D1574969_1%252526nt_source%25253Dnshoplive%252526nt_medium%25253D1574969%252526nt_detail%25253Donair%252526nt_keyword%25253Dshoppinglive%252526prdFrom%25253Db_1574969%252526extras%25253D%2525257B%25252522entryInfo%25252522%2525253A%2525257B%25252522sourceId%25252522%2525253A%252525221574969%25252522%2525252C%25252522sourceType%25252522%2525253A%25252522BROADCAST%25252522%2525252C%25252522externalId%25252522%2525253A%25252522shoppinglive%25252522%2525252C%25252522externalServiceType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522tr%25252522%2525253A%25252522lim5%25252522%2525252C%25252522trx%25252522%2525253A%252525221574969_1%25252522%2525252C%25252522fm%25252522%2525253Anull%2525252C%25252522sn%25252522%2525253Anull%2525252C%25252522ea%25252522%2525253Anull%2525252C%25252522returnParams%25252522%2525253A%25252522%2525257B%2525257D%25252522%2525252C%25252522slAccountType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522slAccountId%25252522%2525253A%25252522d7reO%25252522%2525252C%25252522commissionType%25252522%2525253Anull%2525252C%25252522thirdPartyInfoAgreementType%25252522%2525253Anull%2525257D%2525257D%252526header%25253Dfalse%2526nl-au%253D72b8fa00d4844155bd16c5682f869759',
                surl: 'https%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Ffds%252Fauth%252FkeypadFail%253Faction%253DREPLACE%2526rurl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Fapply%252Fshopn%252F2025031282074571%252F2025031282074571%2526surl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252F443c0630-0505-1a01-d19c-d058401cefc8%253FbackUrl%253Dhttps%25253A%25252F%25252Fproduct.shoppinglive.naver.com%25252Fproducts%25252F11364953053%25253FNaPm%25253Dct%2525253Dm85vd8dp%2525257Cci%2525253Dshopn%2525257Ctr%2525253Dlim5%2525257Chk%2525253D489dc88bc28518bc226b9042238b545b141afd74%2525257Ctrx%2525253D1574969_1%252526nt_source%25253Dnshoplive%252526nt_medium%25253D1574969%252526nt_detail%25253Donair%252526nt_keyword%25253Dshoppinglive%252526prdFrom%25253Db_1574969%252526extras%25253D%2525257B%25252522entryInfo%25252522%2525253A%2525257B%25252522sourceId%25252522%2525253A%252525221574969%25252522%2525252C%25252522sourceType%25252522%2525253A%25252522BROADCAST%25252522%2525252C%25252522externalId%25252522%2525253A%25252522shoppinglive%25252522%2525252C%25252522externalServiceType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522tr%25252522%2525253A%25252522lim5%25252522%2525252C%25252522trx%25252522%2525253A%252525221574969_1%25252522%2525252C%25252522fm%25252522%2525253Anull%2525252C%25252522sn%25252522%2525253Anull%2525252C%25252522ea%25252522%2525253Anull%2525252C%25252522returnParams%25252522%2525253A%25252522%2525257B%2525257D%25252522%2525252C%25252522slAccountType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522slAccountId%25252522%2525253A%25252522d7reO%25252522%2525252C%25252522commissionType%25252522%2525253Anull%2525252C%25252522thirdPartyInfoAgreementType%25252522%2525253Anull%2525257D%2525257D%252526header%25253Dfalse%2526nl-au%253D72b8fa00d4844155bd16c5682f869759',
            }
            const {result: compressed} = await window.compress(redirectUrls)

            await window.decompress(compressed)
            return await window.get(compressed, 'furl')
        })

        expect(result).toBe(undefined)
    })

    test('유효하지 않은 데이터라면 undefined를 반환한다.', async ({page}) => {
        const result = await page.evaluate(async () => {
            return await window.get('abcdefg', 'a')
        })

        expect(result).toEqual(undefined)
    })
})

test.describe('URLParamCompressor 페이지 네비게이션 시나리오', () => {
    test.describe('기본 네비게이션: example.com → next1 → next2 → next3', () => {
        test('각 단계별 압축과 해제가 정상 동작함', async ({page}) => {
            const result = await page.evaluate(async () => {
                // 1→2단계: 홈페이지 정보 압축
                const step2Data = {
                    rurl: 'https://example.com',
                    surl: 'https://example.com',
                }

                const {result: step2Compressed} = await window.compress(step2Data)
                const step2Restored = await window.decompress(step2Compressed)

                const step2FullUrl = `https://example.com/next1?rurl=${encodeURIComponent(
                    'https://example.com',
                )}&surl=${encodeURIComponent('https://example.com')}`
                const step3Data = {
                    rurl: step2FullUrl,
                    surl: step2FullUrl,
                }
                const {result: step3Compressed} = await window.compress(step3Data)
                const step3Restored = await window.decompress(step3Compressed)

                const step3FullUrl = `https://example.com/next1/next2?rurl=${encodeURIComponent(
                    step2FullUrl,
                )}&surl=${encodeURIComponent(step2FullUrl)}`
                const step4Data = {
                    rurl: step3FullUrl,
                    surl: step3FullUrl,
                }
                const {result: step4Compressed} = await window.compress(step4Data)
                const step4Restored = await window.decompress(step4Compressed)

                return {step2Restored, step2FullUrl, step3Restored, step3FullUrl, step4Restored}
            })

            expect(result.step2Restored).not.toBe(null)
            expect(result.step2Restored!.rurl).toBe('https://example.com')
            expect(result.step2Restored!.surl).toBe('https://example.com')

            expect(result.step3Restored).not.toBe(null)
            expect(result.step3Restored!.rurl).toBe(result.step2FullUrl)
            expect(result.step3Restored!.surl).toBe(result.step2FullUrl)

            expect(result.step4Restored).not.toBe(null)
            expect(result.step4Restored!.rurl).toBe(result.step3FullUrl)
            expect(result.step4Restored!.surl).toBe(result.step3FullUrl)
        })

        test('복잡한 쿼리 데이터도 압축/해제됨', async ({page}) => {
            const result = await page.evaluate(async () => {
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

                const {result: compressed} = await window.compress(complexData)
                const restored = await window.decompress(compressed)

                return {restored, complexData}
            })

            expect(result.restored).toEqual(result.complexData)
        })

        test('중첩된 히스토리에서 이전 페이지 정보 추출 가능', async ({page}) => {
            const result = await page.evaluate(async () => {
                // 3단계 네비게이션 후 역추적
                const originalPage = 'https://example.com'

                const step2Data = {rurl: originalPage, surl: originalPage}
                const {result: step2Compressed} = await window.compress(step2Data)

                const step2Restored = await window.decompress(step2Compressed)

                const step2FullUrl = `https://example.com/next1?rurl=${encodeURIComponent(
                    step2Restored!.rurl!,
                )}&surl=${encodeURIComponent(step2Restored!.surl!)}`
                const step3Data = {rurl: step2FullUrl, surl: step2FullUrl}
                const {result: step3Compressed} = await window.compress(step3Data)

                // step3에서 이전 페이지 정보 추출
                const step3Restored = await window.decompress(step3Compressed)
                const step2Params = new URLSearchParams(step3Restored?.rurl!.split('?')[1])

                return {
                    step2Restored,
                    step3Restored,
                    step2ParamsRurl: step2Params.get('rurl'),
                    step2ParamsSurl: step2Params.get('surl'),
                }
            })

            expect(result.step2Restored).not.toBe(null)
            expect(result.step3Restored).not.toBe(null)

            expect(result.step2ParamsRurl).toBe('https://example.com')
            expect(result.step2ParamsSurl).toBe('https://example.com')
        })
    })
})
