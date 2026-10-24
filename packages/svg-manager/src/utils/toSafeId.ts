// `url(#...)`/CSS selector 참조에 안전하도록 selector-unsafe 문자를 `_`로 치환한다.
export default function toSafeId(id: string): string {
    return id.replace(/[^a-zA-Z0-9_-]/g, '_')
}
