/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Utilizes html-react-parser with DOMPurify for safe HTML parsing
 */
import * as htmlReactParser from 'html-react-parser'
import DOMPurify from 'isomorphic-dompurify'

import type {DOMNode, HTMLReactParserOptions} from 'html-react-parser'

// html-react-parser가 esm에서 cjs 모듈을 re-export 하는 문제 처리
// In CJS: htmlReactParser.default.default is the actual function
// In ESM: htmlReactParser.default is the function
const parse = ((htmlReactParser as any).default?.default ||
    (htmlReactParser as any).default ||
    htmlReactParser) as typeof htmlReactParser.default

export interface SafeParseOptions extends HTMLReactParserOptions {
    /**
     * DOMPurify Options
     */
    sanitizeConfig?: DOMPurify.Config
    /**
     * Custom tag preservation option (temporary conversion before and after DOMPurify processing)
     */
    preserveCustomTags?: string[]
}

export const DEFAULT_SANITIZE_CONFIG: DOMPurify.Config = {
    ALLOWED_TAGS: [
        'p',
        'br',
        'strong',
        'em',
        'b',
        'i',
        'u',
        'span',
        'div',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'h',
        'ul',
        'ol',
        'li',
        'dl',
        'dt',
        'dd',
        'a',
        'img',
    ],
    KEEP_CONTENT: true,
}

/**
 * @param htmlString - HTML string to parse
 * @param options - html-react-parser options with DOMPurify settings
 * @returns Parsed React elements
 */
export function safeParse(htmlString: string, options: SafeParseOptions = {}) {
    const {sanitizeConfig = DEFAULT_SANITIZE_CONFIG, preserveCustomTags, ...parserOptions} = options

    // Temporarily convert custom tags to safe tags to preserve them during DOMPurify processing
    const processedHtml =
        preserveCustomTags?.reduce(
            (str, tag) =>
                str
                    .replace(new RegExp(`<${tag}>`, 'g'), `<span data-custom-tag="${tag}">`)
                    .replace(new RegExp(`</${tag}>`, 'g'), '</span>'),
            htmlString,
        ) || htmlString

    const sanitizedHtml = DOMPurify.sanitize(processedHtml, sanitizeConfig)

    return parse(sanitizedHtml, {
        ...parserOptions,
        replace: (domNode, index) => {
            if (
                domNode.type === 'tag' &&
                domNode.name === 'span' &&
                domNode.attribs &&
                domNode.attribs['data-custom-tag']
            ) {
                const customTagNode = {
                    ...domNode,
                    name: domNode.attribs['data-custom-tag'],
                    attribs: domNode.attribs,
                } as DOMNode

                if (parserOptions.replace) {
                    const userResult = parserOptions.replace(customTagNode, index)
                    if (userResult) {
                        return userResult
                    }
                }

                return domNode
            }

            if (parserOptions.replace) {
                return parserOptions.replace(domNode, index)
            }
        },
    })
}
