const globalContext = typeof global !== 'undefined' ? global : window

/**
 * URL 인스턴스를 생성합니다.
 * URL 클래스를 지원하지 않는 IE11은 빈 Document를 사용해 HTMLBaseElement, HTMLAnchorElement 조합으로 대신합니다.
 *
 * @see https://github.com/lifaon74/url-polyfill/blob/master/url-polyfill.js
 * @see https://github.com/arv/DOM-URL-Polyfill/blob/master/src/url.js
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URL
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement
 * */
export default function createUrlLike(url: string, base?: string): URL | HTMLAnchorElement {
    const locationOrigin = typeof window !== 'undefined' ? window.location.origin : null
    const baseOrFallback = base ?? locationOrigin ?? 'https://fallback-origin.naver.com'
    return globalContext.URL && globalContext.URL.prototype
        ? new globalContext.URL(url, baseOrFallback)
        : (() => {
              const doc = document.implementation.createHTMLDocument('')
              if (baseOrFallback) {
                  const baseElement = doc.createElement('base')
                  baseElement.href = baseOrFallback
                  doc.head.appendChild(baseElement)
              }
              const anchorElement = doc.createElement('a')
              anchorElement.href = url
              doc.body.appendChild(anchorElement)
              return anchorElement
          })()
}
