import React, { forwardRef } from 'react'
import { icon_sets } from './icon_sets'

declare global {
	type IconNames = keyof typeof icon_sets
}
type IconProps = Html<HTMLSpanElement> & {
	name: IconNames
	stroke?: number
	size?: any
	height?: any
	width?: any
}

export default forwardRef(function Icon(
	props: IconProps,
	refer: React.Ref<HTMLSpanElement>,
) {
	const { name, size = 18, height, width, stroke = 2, ...attr } = props
	if (!(name in icon_sets)) return <></>

	// prettier-ignore
	return (
		<span aria-hidden='true' {...attr} ref={refer} role='img' data-icon={name}>
			<svg viewBox='0 0 24 24' width={size} height={size}
			fill='none' strokeWidth={stroke} stroke='currentcolor'
			strokeLinecap='round' strokeLinejoin='round'>
				{icon_sets[name]}
			</svg>
		</span>
	)
})
