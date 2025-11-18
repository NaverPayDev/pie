/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Utilizes html-react-parser with DOMPurify for safe HTML parsing
 */
import * as htmlReactParser from 'html-react-parser'

import {sanitizeHtml, type SanitizeConfig} from './utils/dompurify'

import type {DOMNode, HTMLReactParserOptions} from 'html-react-parser'

// Solving the issue of html-react-parser re-exporting cjs modules in esm
// In CJS: htmlReactParser.default.default is the actual function
// In ESM: htmlReactParser.default is the function
const parse = ((htmlReactParser as any).default?.default ||
    (htmlReactParser as any).default ||
    htmlReactParser) as typeof htmlReactParser.default

export interface SafeParseOptions extends HTMLReactParserOptions {
    /**
     * DOMPurify Options
     */
    sanitizeConfig?: SanitizeConfig
    /**
     * Custom tag preservation option (temporary conversion before and after DOMPurify processing)
     */
    preserveCustomTags?: string[]
}

export const DEFAULT_SANITIZE_CONFIG: SanitizeConfig = {
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

    const sanitizedHtml = sanitizeHtml(processedHtml, sanitizeConfig)

    if (!sanitizedHtml) {
        return null
    }

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
