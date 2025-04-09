import {describe, expect, test} from 'vitest'

import encodeHTMLEntity from '../src/utils/encodeHTMLEntity'

const patternForVerify = /[<>'"]/

describe('encodeHTMLEntity', () => {
    test(`javascript:/*--><svg/onload='+/"/+/onmouseover=1/+/[*/[]/+alert(1)//'>"`, () => {
        const html = `javascript:/*--><svg/onload='+/"/+/onmouseover=1/+/[*/[]/+alert(1)//'>"`
        const encoded = encodeHTMLEntity(html)
        expect(patternForVerify.test(encoded)).toBeFalsy()
    })

    test(`<><><><>"""''''&&&&`, () => {
        const html = `<><><><>"""''''&&&&`
        const encoded = encodeHTMLEntity(html)
        expect(patternForVerify.test(encoded)).toBeFalsy()
    })
})
