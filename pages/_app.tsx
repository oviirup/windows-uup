import type { AppProps } from 'next/app'
import { SEO, Header, Footer, Head } from 'components'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
// stylesheet
import 'styles/globals.sass'

type MyAppProps = AppProps & {
	Component: { id: string }
}

const App: React.FC<MyAppProps> = ({ Component, pageProps }) => {
	const { id } = Component

	const seo: SeoProps = {
		canonical: useRouter().asPath,
		openGraph: {
			url: useRouter().asPath,
		},
	}

	return (
		<ThemeProvider attribute='class'>
			<Head>
				<SEO {...seo} />
				<SEO.Default />
				<meta name='viewport' content='width=device-width,initial-scale=1,viewport-fit=cover' />
			</Head>
			<Header />
			<main className='container flex flex-col flex-1' data-page={id}>
				<Component {...pageProps} />
			</main>
			<Footer />
		</ThemeProvider>
	)
}

export default App
