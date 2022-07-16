import React from 'react'
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextApiHandler, NextPage } from 'next'

declare global {
	// NextJS
	declare namespace Next {
		type Page = NextPage
		type API = NextApiHandler
		type StaticProps = GetStaticProps
		type StaticPaths = GetStaticPaths
		type ServerProps = GetServerSideProps
	}

	// Components
	interface TagProp<el extends React.ElementType = React.ElementType> {
		tag?: el
	}
	type Omit<Object, K extends keyof Object> = Pick<Object, Exclude<keyof Object, K>>
	type HTML<EL = HTMLElement> = React.HTMLProps<EL> & TagProp
}
