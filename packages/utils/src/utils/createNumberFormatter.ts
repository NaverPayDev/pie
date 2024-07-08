/**
 * @description 컴마 옵션
 */
interface CommaOptions {
    /**
     * @description 컴마를 찍을 자릿수 (소수점은 컴마를 찍지 않음)
     */
    width: number
}

/**
 * @description 숫자 단위 옵션
 */
interface UnitOptions {
    /**
     * @description 단위 문자
     */
    text: string

    /**
     * @description 숫자와 단위 사이에 공백 여부, 기본값은 false
     */
    space?: boolean
}

/**
 * @description 부호 표시 옵션
 */
interface SignOptions {
    /**
     * @description 양수 및 0인 경우에도 항상 부호를 표시할지 여부, 기본값은 false. always와 상관없이 0 일 때 부호를 생략하고 싶다면 skipSignAtZero옵션을 사용해주세요.
     */
    always?: boolean

    /**
     * @description 부호와 숫자 사이에 공백 추가 여부, 기본값은 false
     */
    space?: boolean

    /**
     * @description 0에 부호를 생략할지 여부. always와 상관 없이 작동.
     */
    skipSignAtZero?: boolean
}

/**
 * @description 고정 자릿수 옵션
 */
interface FixedOptions {
    /**
     * @description 총 자릿수, 지정하지 않으면 숫자 길이
     */
    length?: number

    /**
     * @description 소수점 이하 자릿수, 기본값은 0
     */
    fractionDigits?: number

    /**
     * @description 고정길이가 숫자 길이보다 길 때 남는 공간을 채울 문자, 기본값은 공백(' ') 문자
     */
    fillString?: string

    /**
     * @description 부호를 fillString보다 왼쪽으로 표시할지 여부, 기본값은 false
     */
    signStart?: boolean
}

interface FormatOptions {
    /**
     * @description 컴마 옵션
     */
    comma?: CommaOptions

    /**
     * @description 숫자 단위 옵션
     */
    unit?: UnitOptions

    /**
     * @description 부호 표시 옵션
     */
    sign?: SignOptions

    /**
     * @description 고정 자릿수 옵션
     */
    fixed?: FixedOptions
}

interface OutputInfo {
    input: number
    transformed: string
    prefix: string
    postfix: string
}

type Processor = (prevOutputInfo: OutputInfo) => OutputInfo

function createNumberFormatter({comma, sign, unit, fixed}: FormatOptions) {
    const processorList: Processor[] = [
        getCommaProcessor(comma),
        getSignProcessor(sign),
        getUnitProcessor(unit),
        getFixedProcessor(fixed),
    ]

    return (value: number | string, defaultValue = 0) => {
        const valueNumber = parseFloat(`${value}`)
        const input = isNaN(valueNumber) ? defaultValue : valueNumber

        const initialOutputInfo: OutputInfo = {
            input,
            prefix: '',
            postfix: '',
            transformed: `${input}`,
        }

        const {prefix, transformed, postfix} = processorList.reduce(
            (prevOutput, processor) => processor(prevOutput),
            initialOutputInfo,
        )
        return `${prefix}${transformed}${postfix}`
    }
}

function getCommaProcessor({width}: CommaOptions = {width: 0}): Processor {
    return (prevOutputInfo: OutputInfo) => {
        let formattedNumber = `${prevOutputInfo.input}`

        if (width <= 0) {
            return {
                ...prevOutputInfo,
                transformed: formattedNumber,
            }
        }

        const reg = new RegExp(`(^[+-]?\\d+)(\\d{${width}})`)

        while (reg.test(formattedNumber)) {
            formattedNumber = formattedNumber.replace(reg, '$1,$2')
        }

        return {
            ...prevOutputInfo,
            transformed: formattedNumber,
        }
    }
}

function getUnitProcessor({text, space = false}: UnitOptions = {text: ''}): Processor {
    return (prevOutputInfo: OutputInfo) => {
        const spaceText = space ? ' ' : ''

        return {
            ...prevOutputInfo,
            postfix: `${spaceText}${text}`,
        }
    }
}

function getSignProcessor({always = false, space = false, skipSignAtZero = false}: SignOptions = {}): Processor {
    return (prevOutputInfo: OutputInfo) => {
        const spaceText = space ? ' ' : ''

        const {input} = prevOutputInfo
        const isMinus = input < 0
        const sign = isMinus ? '-' : '+'
        const prefix = input === 0 && skipSignAtZero ? '' : always || isMinus ? `${sign}${spaceText}` : ''
        const transformed = prevOutputInfo.transformed.replace('-', '')

        return {
            ...prevOutputInfo,
            prefix,
            transformed,
        }
    }
}

const FRACTION_DIGITS_REGEX = /\.\d+/g

function getFixedProcessor({
    length,
    fractionDigits = 0,
    fillString = ' ',
    signStart = false,
}: FixedOptions = {}): Processor {
    return (prevOutputInfo: OutputInfo) => {
        const {postfix, prefix, input, transformed} = prevOutputInfo
        const prefixLength = prefix.length
        const postfixLength = postfix.length

        const fractionDigitsString = (input - Math.floor(input)).toFixed(fractionDigits).replace('0', '')
        const integerString = transformed.replace(FRACTION_DIGITS_REGEX, '')
        const limitLength = length ? length - prefixLength - postfixLength : 0

        const nextTransformed = `${integerString}${fractionDigitsString}`

        if (signStart) {
            return {
                ...prevOutputInfo,
                transformed: nextTransformed.padStart(limitLength, fillString),
            }
        } else {
            return {
                ...prevOutputInfo,
                prefix: '',
                transformed: `${prefix}${nextTransformed}`.padStart(limitLength + prefixLength, fillString),
            }
        }
    }
}

export default createNumberFormatter
