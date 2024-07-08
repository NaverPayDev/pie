// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<string, any>
/**
 * 객체들을 내부속성도 병합되도록 병합합니다. 같은 속성은 배열 뒤에 오는 객체의 속성으로 덮어씁니다.
 * @param objs 병합할 객체들의 배열
 * @param isUndefinedValid 병합할 어떤 객체 내부 속성 중 undefined 가 있을경우 해당속성을 undefined로 덮어씌울지 여부(기본값은 true)
 * @returns 병합된 객체
 */
const deepMerge = (objs: AnyObject[], isUndefinedValid: boolean = true): AnyObject => {
    return objs.reduce((acc: AnyObject, obj: AnyObject) => {
        Object.keys(obj).forEach((key) => {
            if (!isUndefinedValid && obj[key] === undefined) {
                return
            }
            if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
                if (!acc[key]) {
                    acc[key] = {}
                }
                acc[key] = deepMerge([acc[key], obj[key]])
            } else {
                acc[key] = obj[key]
            }
        })
        return acc
    }, {})
}
export default deepMerge
