/**
 * 단어와, 단어에 사용가능한 조사 두개를 넘겨주면, 단어에 맞는조사를 붙여줍니다.
 * https://gun0912.tistory.com/65
 * getComleteWordByJongsung와 동일합니다.
 *
 * @param word
 * @param suffix1
 * @param suffix2
 * @returns
 */

export default function getKoreanWithSuffix(word: string, suffix1: string, suffix2: string) {
    if (word.length === 0) {
        return word
    }

    const lastWord = word[word.length - 1]
    const utf16Code = lastWord.charCodeAt(0)
    const numEnds = 28

    if (utf16Code < 44032 || utf16Code > 55204) {
        return word
    }

    return (utf16Code - 44032) % numEnds > 0 ? word + suffix1 : word + suffix2
}
