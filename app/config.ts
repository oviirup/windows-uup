let vercelURL = process.env.NEXT_PUBLIC_VERCEL_URL

export const siteURL = vercelURL
export const siteTitle = 'Windows UUP'
export const siteStatus = 'BETA'

export const authorURL = 'https://avirup-info-frontend.vercel.app'
export const projectRepo = 'https://github.com//graygalaxy/windows-uup'

export const defaultSEO: Metadata = {
	title: {
		default: siteTitle,
		template: `%s - ${siteTitle}`,
	},
	openGraph: {
		type: 'website',
		title: {
			default: siteTitle,
			template: `%s - ${siteTitle}`,
		},
		locale: 'en',
	},
	colorScheme: 'light dark',
	icons: {
		icon: '/favicon.ico',
		shortcut: [{ url: '/favicon.ico', sizes: '32' }],
	},
}
