/**
 * 공백을 NO-BREAK SPACE인 U+00A0으로 변환해줍니다.
 * replaceSpace와 동일합니다.
 *
 * @param text
 * @returns 정상적인 공백으로 변환된 문자
 */
export default function replaceNoBreakSpace(text: string) {
    return text.replace(/ /gi, '\u00a0')
}
