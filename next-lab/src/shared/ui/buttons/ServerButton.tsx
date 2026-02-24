import React, {ReactNode} from 'react'

export const ServerButton = ({action, children}: Readonly<{
  action: () => Promise<void>;
  children: ReactNode;
}>) => {
  return (
    <form action={action}>
      <button type={"submit"}>
        {children}
      </button>
    </form>
  )
}

export default ServerButton
