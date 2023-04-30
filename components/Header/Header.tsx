'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@wits/next-themes'
import { Icon, Link } from '@/components'
import { cn } from '@/components/utils'
import { siteTitle, projectRepo } from '@/app/config'

import $ from './header.module.sass'

export default function Header() {
	const header = useRef<HTMLElement>(null)

	const { theme, setTheme } = useTheme()
	const [isDark, setIsDark] = useState(false)

	const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
	useEffect(() => setIsDark(theme === 'dark'), [theme])

	return (
		<header className={cn($.header)} ref={header}>
			<div className={$.wrapper}>
				<Link href='/' className={$.title}>
					<h3>{siteTitle}</h3>
				</Link>
				<nav className={$.navigation}>
					<button
						className={$.theme_toggle}
						onClick={toggleTheme}
						type='button'
						aria-label='toggle dark mode'
					>
						<mark>toggle dark mode</mark>
						<Icon name={isDark ? 'moon' : 'sun'} />
					</button>
					<Link href={projectRepo} className={$.repo_link}>
						<mark>github repo</mark>
						<Icon name='github' />
					</Link>
				</nav>
			</div>
		</header>
	)
}
