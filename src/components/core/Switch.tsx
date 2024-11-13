'use client';

import React from 'react';
import { Switch as AriaSwitch, SwitchProps as AriaSwitchProps } from 'react-aria-components';
import { cn } from '@/components/utils';

function Switch({ children, className, ...props }: AriaSwitchProps) {
  return (
    <AriaSwitch
      className={cn(
        'group inline-flex cursor-pointer items-center gap-2 text-sm font-medium leading-none disabled:cursor-not-allowed disabled:opacity-70',
        className,
      )}
      {...props}>
      <div className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-input transition-colors group-data-[disabled]:cursor-not-allowed group-data-[readonly]:cursor-default group-data-[selected]:bg-primary group-data-[disabled]:opacity-50 group-data-[focus-visible]:outline-none group-data-[focus-visible]:outline-ring group-data-[focus-visible]:ring-2 focus-visible:outline-none">
        <div className="pointer-events-none block size-5 translate-x-0 rounded-full border border-subtle/50 bg-background shadow-lg ring-0 transition-transform group-data-[selected]:translate-x-5" />
      </div>
    </AriaSwitch>
  );
}

namespace Switch {
  export type Props = AriaSwitchProps;
  export type Ref = HTMLLabelElement;
}

export { Switch };
