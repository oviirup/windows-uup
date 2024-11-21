'use client';

import { useTheme } from 'next-themes';
import React from 'react';
import { Anchor, Icon, Switch } from '@/components/core';
import { DEFAULT_THEME, SITE_NAME } from '@/const';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState(DEFAULT_THEME === 'dark');

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  React.useLayoutEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  return (
    <header
      className="group/header sticky top-0 z-50 overflow-hidden border-border/50 data-opaque:border-b data-opaque:bg-background/75 data-opaque:backdrop-blur-md"
      data-opaque="false">
      <div className="container flex h-16 items-center">
        <Anchor
          href="/"
          className="-translate-y-16 text-lg opacity-0 group-data-opaque/header:translate-y-0 group-data-opaque/header:opacity-100">
          {SITE_NAME}
        </Anchor>
        <div className="ml-auto flex gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2.5 text-muted-fg">
            <Icon name={isDarkMode ? 'moon' : 'sun'} size={18} />
            <Switch checked={isDarkMode} onCheckedChange={toggleTheme} aria-label="toggle theme" />
          </label>
        </div>
      </div>
    </header>
  );
}
