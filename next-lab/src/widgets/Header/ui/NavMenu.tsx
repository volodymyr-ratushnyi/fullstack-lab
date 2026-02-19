import {PagesLinkConfig} from "@/shared/config/pages-url.config"
import classNames from "classnames"
import {headers} from "next/headers"
import Link from "next/link"
import style from "./NavMenu.module.scss"

const NavMenu = async  () => {
  const headersList = await headers()
  const pathName = headersList.get("referer") || "/"
  return <ul className={style.navMenu}>
    {PagesLinkConfig.getNavLinks().map(({href, label}) => <li key={href}>
      <Link
        href={href}
        scroll={false}
        className={classNames({active: pathName === href})}
      >
        {label}
      </Link>
    </li>)}
  </ul>
}

export default NavMenu
