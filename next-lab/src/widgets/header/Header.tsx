import Logo from "@/widgets/header/_ui/Logo"
import NavMenu from "@/widgets/header/_ui/NavMenu"
import {UserMenu} from "@/features/auth"
import styles from '@/widgets/header/_ui/Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo/>
      <NavMenu/>
      <UserMenu/>
    </header>
  )
}
