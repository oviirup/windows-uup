import { forwardRef } from 'react'
import Anchor, { LinkProps } from 'next/link'
import { isExternal } from '@/components/utils'

type HTMLProps = Omit<Html<HTMLAnchorElement>, keyof LinkProps>
type AnchorProps = LinkProps & HTMLProps & { text?: React.ReactNode }

export default forwardRef(function Link(
	props: AnchorProps,
	refer: React.Ref<HTMLAnchorElement>,
) {
	const { href, text, ...attr } = props
	const _href = href.toString()
	const URLstring = _href?.replace(/https?\:\/+(www.)?/, '')

	if (isExternal(href) && !props.target) {
		attr.target = '_blank'
		attr.rel = 'noopener noreferrer'
	}

	return (
		<Anchor href={_href} {...attr} ref={refer}>
			{props.children ?? text ?? URLstring}
		</Anchor>
	)
})
