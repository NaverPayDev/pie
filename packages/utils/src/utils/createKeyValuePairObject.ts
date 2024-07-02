/**
 * Key와 동일한 문자열을 가진 Value를 연결한 Object를 생성해 주는 함수입니다.
 * */
export default function createKeyValuePairObject<T extends string>(keys: T[]): {[K in T]: K} {
    return Object.fromEntries(keys.map((key) => [key, key])) as {[K in T]: K}
}
