import Link, { LinkProps } from 'next/link';
import type { Route } from 'next';

// prettier-ignore
type AnchorRelations = 
  |'nofollow'|'noopener'|'noreferrer'|'prev'|'search'|'tag'|'license'|'next'
  |'alternate'|'author'|'bookmark'|'external'|'help'

export type AnchorProps = Omit<React.HTMLProps<HTMLAnchorElement>, 'rel'> &
  LinkProps<Route> & {
    rel?: AnchorRelations | (string & {});
    external?: boolean;
    text?: React.ReactNode;
  };

function Anchor(props: AnchorProps) {
  const { href, text, external = false, ...attr } = props;
  const _href = href.toString();
  const URLstring = _href?.replace(/https?\:\/+(www.)?/, '');

  if (external && !props.target) {
    attr.target = '_blank';
  }

  return (
    <Link href={_href as Route} {...attr}>
      {props.children ?? text ?? URLstring}
    </Link>
  );
}

namespace Anchor {
  export type Props = AnchorProps;
  export type Ref = HTMLAnchorElement;
}

export { Anchor };
