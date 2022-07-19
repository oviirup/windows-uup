import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { Anchor, Icon } from 'components'

const Header: React.FC<HTML> = (props) => {
	const { tag: Tag = 'header', ...attr } = props
	const [icon, setIcon] = useState<'sun' | 'moon'>('sun')
	const { theme, setTheme } = useTheme()

	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
	useEffect(() => setIcon(theme === 'dark' ? 'sun' : 'moon'), [theme])

	return (
		<Tag {...attr} className='c-header'>
			<div className='container flex items-center h-nav'>
				<Anchor href='/' className='font-light text-current'>
					<h3>windows.uup</h3>
				</Anchor>
				<nav className='flex items-center gap-2 ml-auto nav-menu'>
					<button type='button' onClick={toggleTheme} className='p-2 nav-button'>
						<Icon name={icon} />
						<i className='sr-only'>Toggle Theme</i>
					</button>
					<Anchor href='https://github.com/graygalaxy/windows-uup' className='p-2 nav-button'>
						<Icon name='github' />
						<i className='sr-only'>Github repository</i>
					</Anchor>
				</nav>
			</div>
		</Tag>
	)
}

export default Header
