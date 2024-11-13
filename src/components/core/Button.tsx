import React from 'react';
import { Slot } from '@/components/core';
import { cn } from '@/components/utils';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-[0.5em] whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      intent: {
        default: 'bg-primary text-primary-fg hocus:bg-primary/90',
        destructive: `bg-destructive text-destructive-fg hover:bg-destructive/90`,
        outline: `border border-input bg-background hover:bg-popover hover:text-popover-fg`,
        secondary: `bg-secondary text-secondary-fg hover:bg-secondary/80`,
        ghost: `hover:bg-popover hover:text-popover-fg`,
        link: `text-muted-fg decoration-muted-fg underline-offset-4 hover:text-primary hover:underline focus-visible:text-primary `,
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-12 rounded-md px-8 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
} & VariantProps<typeof buttonVariants>;

function Button({ className, intent: variant, size, asChild = false, ...buttonProps }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  buttonProps.type ??= 'button';

  return <Comp className={cn(buttonVariants({ intent: variant, size, className }))} {...buttonProps} />;
}

Button.variant = buttonVariants;

namespace Button {
  export type Props = ButtonProps;
  export type Ref = HTMLButtonElement;
}

export { Button };
