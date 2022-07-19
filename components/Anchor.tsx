import Link from 'next/link'
import { isExternal } from 'utils'

interface AnchorProps extends Omit<HTML<HTMLAnchorElement>, 'href' | 'as' | 'title'> {
	href: string | URL
	as?: string | URL
	replace?: boolean
	scroll?: boolean
	shallow?: boolean
	prefetch?: boolean
	title?: string | boolean
	text?: React.ReactNode | string
}

// Anchor Component
const Anchor: React.FC<AnchorProps> = (props: AnchorProps) => {
	const { tag: Tag = 'a', as, href, prefetch, replace, scroll, text, ...attr } = props
	const link_props = { href, as, prefetch, replace, scroll }
	Object.assign(attr, { children: props.children || text })

	if (isExternal(href) && !props.target) {
		Object.assign(attr, { target: '_blank', rel: 'noopener noreferrer' })
	}
	if (attr.title === true && typeof props.children === 'string') {
		attr.title = attr.children as string
	}
	if (!props.children && href && !text) {
		attr.children = href.toString().replace(/https?\:\/+(www.)?/, '')
	}

	return (
		<Link {...link_props}>
			<Tag {...attr} />
		</Link>
	)
}

export default Anchor
