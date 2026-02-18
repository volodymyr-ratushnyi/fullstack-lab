import {sizes} from "@/shared/config/layouts.config"
import Logo from "@/widgets/Header/ui/Logo"
import NavMenu from "@/widgets/Header/ui/NavMenu"
// import UserMenu from "@/widgets/Header/ui/UserMenu";
import '@/widgets/Header/ui/Header.module.scss'

export default function Header() {
  return (
    <header className={'ss'} style={{height: sizes.headerHeight}}>
      <Logo/>
      <NavMenu/>
      {/*<UserMenu/>*/}
    </header>
  )
}
