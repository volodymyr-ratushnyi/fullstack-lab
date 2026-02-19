import {PagesLinkConfig} from "@/shared/config/pages-url.config"
import {metaData} from "@/shared/config/seo.config"
import {IconWolf} from "@/shared/icons"
import Link from "next/link"
import React from 'react'
import style from './Logo.module.scss'

export const Logo = () => {
  return (
      <Link href={PagesLinkConfig.HOME.href} className={style.logo}>
        <IconWolf/>
        <h1>{metaData.title}</h1>
      </Link>
  )
}

export default Logo
