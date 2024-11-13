import React from 'react';
import metadata from '@public/icons/icons.meta.json';

export type IconName = keyof typeof metadata;

export type IconProps = React.SVGAttributes<SVGElement> & {
  name: IconName;
  size?: number | string;
};

/**
 * Icon component with svg sprites
 *
 * @see {@link https://youtu.be/1-Gjec48nJs}
 * @see {@link https://benadam.me/thoughts/react-svg-sprites/}
 */
function Icon({ size = '1em', name, ...iconProps }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke="currentcolor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...iconProps}
      viewBox="0 0 24 24"
      role="img"
      data-icon={name}
      aria-hidden>
      <use href={`/icons/icons.sprite.svg#${name}`} />
    </svg>
  );
}

namespace Icon {
  export type Props = IconProps;
  export type IconName = keyof typeof metadata;
  export type Ref = SVGSVGElement;
}

export { Icon };
