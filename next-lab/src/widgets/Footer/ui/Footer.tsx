import {metaData} from "@/shared/config/seo.config"
import React from 'react'
import style from './Footer.module.scss'

export const Footer = () => {
  return (
    <footer
      className={style.footer}
    >
      {metaData.description}
    </footer>
  )
}
