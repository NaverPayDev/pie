import {SVGProps} from 'react'

import {Property} from 'csstype'

import {IntRange} from './utility-types'

type FillName = `fill${IntRange<2, 6>}`

type SVGFillProps = {
    [key in FillName]?: Property.Fill
}

export interface SVGStyleProps extends SVGProps<SVGSVGElement>, SVGFillProps {
    id?: string
    fill?: Property.Fill
    fill2?: Property.Fill
    fill3?: Property.Fill
    width?: Property.Width<string | number>
    height?: Property.Height<string | number>
    viewBox?: string
    opacity?: Property.Opacity
    style?: React.CSSProperties
    stroke?: Property.Stroke
}
