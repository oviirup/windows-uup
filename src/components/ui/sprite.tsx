import * as React from 'react'

export type SpriteProps = React.SVGAttributes<SVGElement> & {
  size?: number | string
  src: string
  name: string
}

function Sprite({ size = '1.25em', name, src, ...iconProps }: SpriteProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...iconProps}
      role="img">
      <use href={`${src}#${name}`} />
    </svg>
  )
}

namespace Sprite {
  export type Ref = SVGElement
  export type Props = SpriteProps
}
export { Sprite }
