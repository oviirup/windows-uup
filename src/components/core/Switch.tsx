'use client';

import React from 'react';
import { cn } from '@/components/utils';
import * as SwitchPrimitives from '@radix-ui/react-switch';

export type SwitchRef = React.ElementRef<typeof SwitchPrimitives.Root>;
export type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & React.RefAttributes<SwitchRef>;

function Switch({ children, className, ref, ...props }: SwitchProps) {
  return (
    <SwitchPrimitives.Root
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        className,
      )}
      ref={ref}
      {...props}>
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block size-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
        )}
      />
    </SwitchPrimitives.Root>
  );
}

namespace Switch {
  export type Props = SwitchProps;
  export type Ref = HTMLLabelElement;
}

export { Switch };
