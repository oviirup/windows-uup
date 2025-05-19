import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider

type TooltipRootProps = React.ComponentProps<typeof TooltipPrimitive.Root>
function TooltipRoot({ open, onOpenChange, ...props }: TooltipRootProps) {
  const [isOpen, setIsOpen] = React.useState(open)
  const isMobile = useMediaQuery('(any-pointer:coarse)', false)

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      const state = isMobile ? false : open
      setIsOpen(state)
      onOpenChange?.(state)
    },
    [onOpenChange, setIsOpen, isMobile],
  )

  return (
    <TooltipPrimitive.Root
      {...props}
      open={isOpen}
      onOpenChange={handleOpenChange}>
      {props.children}
    </TooltipPrimitive.Root>
  )
}

const TooltipTrigger = TooltipPrimitive.Trigger

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content>
function TooltipContent({
  className,
  sideOffset = 3,
  side = 'bottom',
  ref,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 animate-in overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-fg shadow-md fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        className,
      )}
      side={side}
      {...props}
    />
  )
}

export namespace Tooltip {
  export const Root = TooltipRoot
  export const Provider = TooltipProvider
  export const Trigger = TooltipTrigger
  export const Content = TooltipContent
}
