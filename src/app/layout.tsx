import { ThemeProvider } from 'next-themes'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { cn } from '@/lib/utils'
import { code, heading, sans } from '@/styles/fonts'
import '@/styles/globals.css'

export default function RootLayout({ children }: Props) {
  const fonts = [sans.className, sans.variable, heading.variable, code.variable]
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fonts, 'flex min-h-svh flex-col antialiased')}>
        <ThemeProvider enableSystem disableTransitionOnChange>
          <aside className="__background_dot_grid" aria-hidden />
          <Header />
          <div className="relative flex max-w-full grow">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

export { metadata, viewport } from './metadata'
