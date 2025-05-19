'use client'

import React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

export type SwitchRef = React.ComponentRef<typeof SwitchPrimitives.Root>
export type SwitchProps = React.ComponentProps<typeof SwitchPrimitives.Root>

function Switch({ className, ref, ...props }: SwitchProps) {
  return (
    <SwitchPrimitives.Root
      className={cn(
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent focus-ring transition-colors disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        className,
      )}
      ref={ref}
      {...props}>
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0 transition-[margin] data-[state=checked]:ml-auto data-[state=unchecked]:ml-0',
        )}
      />
    </SwitchPrimitives.Root>
  )
}

namespace Switch {
  export type Props = SwitchProps
  export type Ref = SwitchRef
}

export { Switch }
