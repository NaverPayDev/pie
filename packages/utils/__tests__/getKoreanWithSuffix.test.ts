import {describe, expect, test} from 'vitest'

import getKoreanWithSuffix from '../src/utils/getKoreanWithSuffix'

describe('getKoreanWithSuffix', () => {
    test('네이버파이낸셜에 올바른 조사가 붙는지 확인한다', () => {
        expect(getKoreanWithSuffix('네이버파이낸셜', '은', '는')).toEqual('네이버파이낸셜은')
        expect(getKoreanWithSuffix('네이버파이낸셜', '을', '를')).toEqual('네이버파이낸셜을')
        expect(getKoreanWithSuffix('네이버파이낸셜', '이', '가')).toEqual('네이버파이낸셜이')
    })

    test('네이버에 올바른 조사가 붙는지 확인한다', () => {
        expect(getKoreanWithSuffix('네이버', '은', '는')).toEqual('네이버는')
        expect(getKoreanWithSuffix('네이버', '을', '를')).toEqual('네이버를')
        expect(getKoreanWithSuffix('네이버', '이', '가')).toEqual('네이버가')
    })
})
