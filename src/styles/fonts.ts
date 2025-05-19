import { Fira_Code, Inter, Raleway } from 'next/font/google'

export const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  preload: true,
})

export const heading = Raleway({
  variable: '--font-heading',
  subsets: ['latin'],
})

export const code = Fira_Code({
  variable: '--font-code',
  subsets: ['latin', 'latin-ext'],
})
