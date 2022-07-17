import React from 'react'
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextApiHandler, NextPage } from 'next'
import type { NextSeoProps, DefaultSeoProps } from 'next-seo'
import type { IconNames } from '../components/Icon'

declare global {
	// NextJS
	declare namespace Next {
		type Page<P = {}> = NextPage<P> & { id?: string }
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
	type IconNames = IconNames

	// SEO Props
	type SeoProps = NextSeoProps
	type DefaultSeoProps = DefaultSeoProps
}
