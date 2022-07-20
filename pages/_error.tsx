import { Anchor, SEO } from 'components'
// type difinition
import type { NextPageContext } from 'next'
interface PageProps {
	statusCode: number
}

// Status codes
const statusCodes: { [K: number]: string } = {
	301: 'Moved Permanently',
	307: 'Temporary Redirect',
	308: 'Permanent Redirect',
	400: 'Bad Request',
	404: 'Cannot Find This Page',
	403: 'Forbidden',
	405: 'Method Not Allowed',
	500: 'Internal Server Error',
	501: 'Not Implemented',
	502: 'Bad Gateway',
	503: 'Service Unavailable',
}

const ErrorPage: Next.Page<PageProps> = (props) => {
	const { statusCode } = props
	const statusText = statusCodes[statusCode]
	return (
		<div className='flex flex-col flex-1 flex-center'>
			<SEO title={`(${statusCode}) ${statusText} - CheapBookDeals`} />
			<div className='flex items-center justify-center p-4 mb-5'>
				<h1 className='pr-2 mr-2 border-r border-gray-600'>{statusCode}</h1>
				<div className='error-text pl2'>{statusText}</div>
			</div>
			<Anchor href='/'>Return to Home Page</Anchor>
		</div>
	)
}
ErrorPage.id = 'error'
ErrorPage.getInitialProps = async ({ res, err }: NextPageContext) => {
	const statusCode = res?.statusCode || err?.statusCode || 404
	return { statusCode }
}

export default ErrorPage
