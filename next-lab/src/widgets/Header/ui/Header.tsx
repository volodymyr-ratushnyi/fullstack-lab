import Logo from "@/widgets/Header/ui/Logo"
import NavMenu from "@/widgets/Header/ui/NavMenu"
import UserMenu from "@/widgets/Header/ui/UserMenu"
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo/>
      <NavMenu/>
      <UserMenu/>
    </header>
  )
}
