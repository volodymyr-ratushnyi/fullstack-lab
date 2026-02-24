import Logo from "@/widgets/Header/ui/Logo"
import NavMenu from "@/widgets/Header/ui/NavMenu"
import {UserMenu} from "@/features/auth"
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo/>
      <NavMenu/>
      <UserMenu/>
    </header>
  )
}
