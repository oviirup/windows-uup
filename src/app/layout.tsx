import { Footer, Header } from '@/components/layout';
import { cn } from '@/components/utils';
import { DEFAULT_THEME } from '@/const';
import { inter, raleway } from '@/styles/fonts';
import '@/styles/globals.scss';
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, raleway.variable, 'flex')}>
        <ThemeProvider defaultTheme={DEFAULT_THEME} disableTransitionOnChange>
          <aside className="__background_dot_grid" aria-hidden />
          <Header />
          <div className="relative flex max-w-full grow">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

export { metadata, viewport } from './metadata';
