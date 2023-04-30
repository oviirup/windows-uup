import colors from 'tailwindcss/colors'
import { Config } from 'tailwindcss'

const tailwind: Config = {
	darkMode: ['class', '[data-theme="dark"]'],
	content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				// asign neutral color to gray
				gray: colors.neutral,
				//@ts-ignore removes neutral colors
				neutral: null,
			},
			fontFamily: {
				raleway: 'var(--font-raleway)',
			},
		},
	},
	plugins: [],
}

export default tailwind
