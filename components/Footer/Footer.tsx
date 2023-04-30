import { Link } from '@/components'
import { authorURL } from '@/app/config'
import Vercel from '@/public/vercel.svg'

import $ from './footer.module.sass'

export default function Footer() {
	return (
		<footer className={$.footer}>
			<p className={$.creator}>
				<small>A project by</small>
				<Link href={authorURL}>Avirup Ghosh</Link>
			</p>
			<p>
				<small>Powered By</small>
				<Link href='https://vercel.com/' className={$.x_powered_by}>
					<mark>vercel</mark>
					<Vercel height={16} width={64} />
				</Link>
			</p>
		</footer>
	)
}
