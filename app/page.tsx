import $ from './style.module.sass'

export default function HomePage() {
	return (
		<>
			<section className={$.hero}>
				<h1 className={$.hero_title}>Windows UUP</h1>
				<div className={$.hero_subtitle}>
					Download and Compile UUP files to installable Windows ISO files
					directly from Microsoft servers.
				</div>
			</section>
		</>
	)
}
