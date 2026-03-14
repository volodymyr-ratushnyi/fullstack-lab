import {Button} from '@/components/ui/button'
import React, {ReactNode} from 'react'

export const ServerButton = ({action, children}: Readonly<{
  action: () => Promise<void>;
  children: ReactNode;
}>) => {
  return (
    <form action={action}>
      <Button variant={'outline'} size={'lg'} type={'submit'}>
        {children}
      </Button>
    </form>
  )
}

export default ServerButton
