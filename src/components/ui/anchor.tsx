import Link from 'next/link'
import type { Route } from 'next'
import type { LinkProps } from 'next/link'

export type AnchorProps = LinkProps<Route> &
  Omit<React.HTMLProps<HTMLAnchorElement>, keyof LinkProps<Route>> & {
    external?: boolean
    noreferrer?: boolean
  }

function Anchor({ external, noreferrer, ...props }: Anchor.Props) {
  if (external) props.target ??= '_blank'
  if (noreferrer) props.rel ??= 'noopener noreferrer'

  return <Link {...props} />
}

namespace Anchor {
  export type Ref = HTMLAnchorElement
  export type Props = AnchorProps
}

export { Anchor }
