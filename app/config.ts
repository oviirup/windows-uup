let vercelURL = process.env.NEXT_PUBLIC_VERCEL_URL

export const siteURL = vercelURL
export const siteTitle = 'Windows UUP'
export const siteStatus = 'BETA'

export const authorURL = 'https://avirup-info-frontend.vercel.app'
export const projectRepo = 'https://github.com/graygalaxy/windows-uup'
// prettier-ignore
export const description = 'Download Window Update files directly from Microsoft Servers and convert to ISO files'
export const defaultSEO: Metadata = {
	title: { default: siteTitle, template: `%s - ${siteTitle}` },
	description,
	openGraph: {
		type: 'website',
		title: { default: siteTitle, template: `%s - ${siteTitle}` },
		description,
		locale: 'en',
	},
	twitter: {
		card: 'summary',
		title: { default: siteTitle, template: `%s - ${siteTitle}` },
		description,
	},
	colorScheme: 'light dark',
	icons: {
		icon: '/favicon.ico',
		shortcut: [{ url: '/favicon.ico', sizes: '32' }],
	},
}
