import twAnimate from '@oviirup/tailwindcss-animate';
import racPlugin from 'tailwindcss-react-aria-components';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './src/app/**/*.{js,ts,tsx,mdx}',
    './src/components/**/*.{js,ts,tsx,mdx}',
    './src/content/**/*.{js,ts,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { DEFAULT: '100%', md: '56rem' },
    },
    extend: {
      zIndex: Array.from('123456789').reduce((acc, e) => Object.assign(acc, { [e]: e }), {}),
    },
  },
  plugins: [
    twAnimate,
    racPlugin,
    plugin(({ addVariant }) => {
      // custom variants
      addVariant('hocus', ['&:hover', '&:focus-visible']);
    }),
  ],
};

export default tailwindConfig;
