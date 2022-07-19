import { NextSeo, DefaultSeo } from 'next-seo'
import { permaURL } from 'utils'

import type { DefaultSeoProps } from 'next-seo'

const SEO: React.FC<SeoProps> = (props) => {
	let canon = props.canonical
	let og_url = props.openGraph?.url
	const seo = { ...props, openGraph: props.openGraph || {} }

	if (typeof canon === 'string') {
		seo.canonical = permaURL(canon)
		if (typeof og_url !== 'string') seo.openGraph.url = permaURL(canon)
	}
	if (typeof og_url === 'string') {
		seo.openGraph.url = permaURL(og_url)
	}

	return <NextSeo {...seo} />
}

const default_seo: DefaultSeoProps = {
	defaultTitle: 'Windows UUP',
	titleTemplate: '%s | Windows UUP',
	description: 'Download UUP files directly from Microsoft servers and convert to ISO files',
	openGraph: {
		type: 'website',
		url: permaURL(),
		site_name: 'windows-uup.vercel.app',
		locale: 'en_US',
	},
	twitter: { handle: '@avirup-dev', cardType: 'summary_large_image' },
}

const Default: React.FC = () => {
	return <DefaultSeo {...default_seo} />
}

export default Object.assign(SEO, { Default })
