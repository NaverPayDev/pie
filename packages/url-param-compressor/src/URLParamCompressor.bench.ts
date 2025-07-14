import {bench, describe} from 'vitest'

import {URLParamCompressor} from './URLParamCompressor'

const compressor = new URLParamCompressor()

const generateQueryString = (repeat: number) => {
    const base =
        'https%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Ffds%252Fauth%252FkeypadSuccess%253Faction%253DREPLACE%2526rurl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252Fapply%252Fshopn%252F2025031282074571%252F2025031282074571%2526surl%253Dhttps%253A%252F%252Forders.pay.naver.com%252Fordersheet%252Fseller%252F443c0630-0505-1a01-d19c-d058401cefc8%253FbackUrl%253Dhttps%25253A%25252F%25252Fproduct.shoppinglive.naver.com%25252Fproducts%25252F11364953053%25253FNaPm%25253Dct%2525253Dm85vd8dp%2525257Cci%2525253Dshopn%2525257Ctr%2525253Dlim5%2525257Chk%2525253D489dc88bc28518bc226b9042238b545b141afd74%2525257Ctrx%2525253D1574969_1%252526nt_source%25253Dnshoplive%252526nt_medium%25253D1574969%252526nt_detail%25253Donair%252526nt_keyword%25253Dshoppinglive%252526prdFrom%25253Db_1574969%252526extras%25253D%2525257B%25252522entryInfo%25252522%2525253A%2525257B%25252522sourceId%25252522%2525253A%252525221574969%25252522%2525252C%25252522sourceType%25252522%2525253A%25252522BROADCAST%25252522%2525252C%25252522externalId%25252522%2525253A%25252522shoppinglive%25252522%2525252C%25252522externalServiceType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522tr%25252522%2525253A%25252522lim5%25252522%2525252C%25252522trx%25252522%2525253A%252525221574969_1%25252522%2525252C%25252522fm%25252522%2525253Anull%2525252C%25252522sn%25252522%2525253Anull%2525252C%25252522ea%25252522%2525253Anull%2525252C%25252522returnParams%25252522%2525253A%25252522%2525257B%2525257D%25252522%2525252C%25252522slAccountType%25252522%2525253A%25252522NAVER%25252522%2525252C%25252522slAccountId%25252522%2525253A%25252522d7reO%25252522%2525252C%25252522commissionType%25252522%2525253Anull%2525252C%25252522thirdPartyInfoAgreementType%25252522%2525253Anull%2525257D%2525257D%252526header%25253Dfalse%2526nl-au%253D72b8fa00d4844155bd16c5682f869759'
    const additional = '%2526additional%253DVGhpcyUyMGlzJTIwYSUyMHZlcnklMjBsb25nJTIwcGFyYW1ldGVyJTI'

    return base + additional.repeat(repeat)
}

describe('compress benchmark', () => {
    const getExtremeQuery = (repeat: number) => ({
        rurl: generateQueryString(repeat),
    })

    bench('약 5000자', () => {
        compressor.compress(getExtremeQuery(45))
    })

    bench('약 10,000자', () => {
        compressor.compress(getExtremeQuery(110))
    })

    bench('약 50,000자', () => {
        compressor.compress(getExtremeQuery(650))
    })
})

describe('decompress benchmark', () => {
    const getExtremeQuery = (repeat: number) => ({
        rurl: generateQueryString(repeat),
    })

    const compressed1 = compressor.compress(getExtremeQuery(45)).result
    const compressed2 = compressor.compress(getExtremeQuery(110)).result
    const compressed3 = compressor.compress(getExtremeQuery(650)).result

    bench('약 5000자', () => {
        compressor.decompress(compressed1)
    })

    bench('약 10,000자', () => {
        compressor.decompress(compressed2)
    })

    bench('약 50,000자', () => {
        compressor.decompress(compressed3)
    })
})
