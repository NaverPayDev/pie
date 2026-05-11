import DOMPurify from 'isomorphic-dompurify'

export type DomPurify = typeof DOMPurify

type SanitizeParams = Parameters<DomPurify['sanitize']>
export type DirtyHtml = SanitizeParams[0]
export type SanitizeConfig = SanitizeParams[1]

export function sanitizeHtml(dirty: DirtyHtml, config?: SanitizeConfig) {
    return DOMPurify.sanitize(dirty as string, config)
}
