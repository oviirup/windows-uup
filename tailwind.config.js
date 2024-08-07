import twAnimate from '@oviirup/tailwindcss-animate';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx,mdx}',
    './src/components/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { DEFAULT: '100%', md: '56rem' },
    },
    extend: {
      zIndex: Array.from('123456789').reduce(
        (acc, e) => Object.assign(acc, { [e]: e }),
        {},
      ),
    },
  },
  plugins: [
    twAnimate,
    plugin(({ addVariant }) => {
      // custom variants
      addVariant('hocus', ['&:hover', '&:focus-visible']);
    }),
  ],
};

export default tailwindConfig;
