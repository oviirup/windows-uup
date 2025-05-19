'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { Anchor, Icon, Switch } from '@/components/ui'
import { SITE_NAME } from '@/config'

export function Header() {
  const { resolvedTheme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  const toggleTheme = React.useCallback(
    (checked: boolean) => setTheme(checked ? 'dark' : 'light'),
    [setTheme],
  )

  React.useLayoutEffect(() => {
    setIsDarkMode(resolvedTheme === 'dark')
  }, [resolvedTheme])

  return (
    <header className="group/header sticky top-0 z-50 overflow-hidden">
      <div className="container flex h-16 items-center">
        <Anchor
          href="/"
          className="-translate-y-16 text-lg opacity-0 group-data-opaque/header:translate-y-0 group-data-opaque/header:opacity-100">
          {SITE_NAME}
        </Anchor>
        <div className="ml-auto flex gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 text-muted-fg">
            <Icon name={isDarkMode ? 'moon' : 'sun'} size={18} />
            <Switch
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
              aria-label="toggle theme"
            />
          </label>
        </div>
      </div>
    </header>
  )
}
