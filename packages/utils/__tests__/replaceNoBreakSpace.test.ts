import {describe, expect, test} from 'vitest'

import replaceNoBreakSpace from '../src/utils/replaceNoBreakSpace'

describe('getSignFromNumber', () => {
    // 일반 공백
    test('네이버 파이낸셜', () => {
        expect(replaceNoBreakSpace('네이버 파이낸셜')).toEqual('네이버 파이낸셜')
    })

    // 특수문자 공백
    test('네이버 파이낸셜', () => {
        expect(replaceNoBreakSpace('네이버 파이낸셜')).toEqual('네이버 파이낸셜')
    })
})
