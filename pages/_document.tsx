import type { DocumentContext } from 'next/document'
import Doc, { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
	return (
		<Html lang='en'>
			{/* prettier-ignore */}
			<Head>
				<meta name='google-site-verification' content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
				<link href='https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;600;700&display=swap' rel='stylesheet' />
				<link href='https://fonts.googleapis.com/css2?family=Fira+Code&display=swap' rel='stylesheet' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

Document.getInitialProps = async (ctx: DocumentContext) => {
	const initial = await Doc.getInitialProps(ctx)
	return { ...initial }
}

export default Document
