/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
	theme: {
		container: {
			center: true,
			padding: '1.75rem',
		},

		extend: {
			spacing: {
				nav: '3.5rem',
			},
			colors: {
				primary: 'rgba(var(--color-primary), <alpha-value>)',
				// prettier-ignore
				gray: {
					0: '#fff', 100: '#fafafa', 200: '#eaeaea', 300: '#999', 400: '#888',
					500: '#666', 600: '#444', 700: '#333', 800: '#222', 900: '#111'
				},
			},
			fontFamily: {
				code: ['Fira Code', 'monospace'],
				heading: ['Roboto Slab', 'Segoe UI', 'system-ui', '-apple-system'],
			},
		},
	},
	plugins: [],
}
