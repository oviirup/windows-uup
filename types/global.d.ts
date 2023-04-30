import * as React from 'react'
import * as NEXT from 'next'

declare global {
	/** React props with children */
	type Props<P = {}> = React.PropsWithChildren<P>
	/** HTML element props */
	type Html<El extends HTMLElement = HTMLElement> = React.HTMLProps<El>
	/** Next JS Metadata */
	type Metadata = NEXT.Metadata
}
