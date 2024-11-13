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
      colors: {
        inherit: 'inherit',
        border: 'hsl(var(--border))',
        subtle: 'hsl(var(--subtle))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          fg: 'hsl(var(--primary-fg))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          fg: 'hsl(var(--secondary-fg))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          fg: 'hsl(var(--destructive-fg))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          fg: 'hsl(var(--muted-fg))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          light: 'hsl(var(--accent-light))',
          lighter: 'hsl(var(--accent-lighter))',
          dark: 'hsl(var(--accent-dark))',
          darker: 'hsl(var(--accent-darker))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          fg: 'hsl(var(--popover-fg))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          fg: 'hsl(var(--card-fg))',
        },
      },
      fontFamily: {
        inter: 'var(--font-inter)',
        raleway: 'var(--font-raleway)',
      },
      data: {
        opaque: 'opaque="true"',
        active: 'active="true"',
        selected: 'selected="true"',
      },
    },
  },
  plugins: [
    twAnimate,
    racPlugin,
    // prettier-ignore
    plugin(({ addVariant, matchVariant }) => {
      addVariant('hocus', ['&:hover', '&:focus-visible']);
      // parent selector
      matchVariant('group', (_, { modifier: m }) => {
        const b = m ? `group\\/${e(m)}` : `group`;
        return [`:merge(.${b}):hover &`, `:merge(.${b}):focus-visible &`];
      }, { values: { hocus: 'hocus' } });
      // peer selector
      matchVariant('peer', (_, { modifier: m }) => {
        const b = m ? `peer\\/${e(m)}` : `peer`;
        return [`:merge(.${b}):hover ~ &`, `:merge(.${b}):focus-visible ~ &`];
      }, { values: { hocus: 'hocus' } });
    }),
    // miscellaneous
    plugin(({ addUtilities }) => {
      addUtilities({
        '.outline-ring': {
          '@apply outline-none ring-ring/50 ring-offset-2 ring-offset-background ring-2': {},
        },
        '.link': {
          'textDecorationColor': 'color-mix(in srgb, currentColor, hsl(var(--background)) 60%)',
          '@apply underline underline-offset-2 hocus:underline-offset-4 cursor-pointer': {},
        },
      });
    }),
  ],
};

export default tailwindConfig;
