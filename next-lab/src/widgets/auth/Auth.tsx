import {PagesLinkConfig} from '@/shared/config/pages-url.config'
import {IconEmail} from '@/shared/ui/icons/email'
import {IconGitHub} from '@/shared/ui/icons/github'
import {IconGoogle} from '@/shared/ui/icons/google'
import Link from 'next/link'
import React from 'react'
import style from '@/widgets/auth/_ui/Auth.module.scss'

const Auth = () => {
  return (
    <section className={style.auth}>
      <h2>NextLab Account</h2>
      <button>
        <IconGoogle/>
        Continue with Google
      </button>
      <button>
        <IconGitHub/>
        Continue with GitHub
      </button>
      <span>or</span>
      <button>
        <IconEmail/>
        Continue with Email
      </button>
      <p>
        New here?
        <Link href={PagesLinkConfig.SIGNUP.href}> {PagesLinkConfig.SIGNUP.label}</Link>
      </p>
      <footer>
        By continuing, you agree to the
        <Link href={PagesLinkConfig.ACCOUNT_AGREEMENT.href}> {PagesLinkConfig.ACCOUNT_AGREEMENT.label}</Link>
      </footer>
    </section>
  )
}

export default Auth
