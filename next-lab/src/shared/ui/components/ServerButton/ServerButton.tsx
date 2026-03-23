import {Button, buttonVariants} from 'shared/ui/components/shadcn/button'
import type {VariantProps} from 'class-variance-authority'
import React, {type ReactNode} from 'react'

export const ServerButton = ({
  action,
  variant = 'outline',
  size = 'lg',
  children
}: Readonly<{
  action: () => Promise<void>;
  children: ReactNode;
} & VariantProps<typeof buttonVariants>>) => {
  return (
    <form action={action}>
      <Button variant={variant} size={size} type={'submit'}>
        {children}
      </Button>
    </form>
  )
}

export default ServerButton
