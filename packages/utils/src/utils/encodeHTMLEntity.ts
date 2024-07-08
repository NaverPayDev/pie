/**
 * <, &, >, ", ' 등의 문자열을 HTML에 삽입할 수 있도록 변경해줍니다.
 * https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#rule-1-html-encode-before-inserting-untrusted-data-into-html-element-content
 * encodeHTMLEntity와 동일합니다.
 *
 * @param html
 * @returns
 */
export default function encodeHTMLEntity(html: string) {
    const encodeRules = [
        [`&`, `&amp;`],
        [`<`, `&lt;`],
        [`>`, `&gt;`],
        [`"`, `&quot;`],
        [`'`, `&#x27`],
    ]
    return encodeRules.reduce((encodedHtml, [asIs, toBe]) => encodedHtml.replace(new RegExp(asIs, 'g'), toBe), html)
}
