import {Button} from '@/components/ui/button'
import {signIn} from '@/features/auth'
import {PagesLinkConfig} from '@/shared/config/pages-url.config'
import {ServerButton} from '@/shared/ui'
import {IconEmail} from '@/shared/ui/icons/email'
import {IconGitHub} from '@/shared/ui/icons/github'
import {IconGoogle} from '@/shared/ui/icons/google'
import Link from 'next/link'
import React from 'react'
import style from '@/widgets/auth/_ui/Auth.module.scss'

const Auth = () => {
  const signInGitHub = async () => {
    "use server"
    await signIn("github")
  }
  const signInGoogle = async () => {
    "use server"
    await signIn("google")
  }
  return (
    <section className={style.auth}>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        NextLab Account
      </h4>
      <ServerButton action={signInGitHub}>
        <IconGoogle/>
        Continue with Google
      </ServerButton>
      <ServerButton action={signInGoogle}>
        <IconGitHub/>
        Continue with GitHub
      </ServerButton>
      <span>or</span>
      <Button variant={'outline'} size={'lg'}>
        <IconEmail/>
        Continue with Email
      </Button>
      <p>
        New here?
        <Button asChild variant={'link'} size={'sm'} className={'px-1'}>
          <Link href={PagesLinkConfig.SIGNUP.href}>
            {PagesLinkConfig.SIGNUP.label}
          </Link>
        </Button>
      </p>
      <footer>
        By continuing, you agree to the
        <Button asChild variant={'link'} size={'sm'} className={'px-0'}>
          <Link href={PagesLinkConfig.ACCOUNT_AGREEMENT.href}>
            {PagesLinkConfig.ACCOUNT_AGREEMENT.label}
          </Link>
        </Button>
      </footer>
    </section>
  )
}

export default Auth
