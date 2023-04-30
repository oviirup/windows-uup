import { Raleway } from 'next/font/google'
import { ServerThemeProvider } from '@wits/next-themes'
import { defaultSEO } from '@/app/config'
import { cn } from '@/components/utils'
import { Footer, Header } from '@/components'

import '@/styles/global.sass'
import $ from './style.module.sass'

const raleway = Raleway({
	variable: '--font-raleway',
	subsets: ['latin'],
})

export const metadata: Metadata = defaultSEO

export default function RootLayout({ children }: Props) {
	return (
		<ServerThemeProvider defaultTheme='light' disableTransitionOnChange>
			<html lang='en'>
				<body className={cn(raleway.variable)}>
					<aside className={$.background_image} />
					<Header />
					<section data-content-area=''>{children}</section>
					<Footer />
					<aside id='modal' aria-hidden />
				</body>
			</html>
		</ServerThemeProvider>
	)
}
