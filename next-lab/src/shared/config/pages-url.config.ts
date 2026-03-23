import type {Link} from "@/shared/types/config.types"

export class PagesLinkConfig {
  private static readonly root: string = '/'
  static readonly HOME: Link = {href: this.root, label: 'Home'}
  static readonly MAIN: Link = {href: `${this.root}main`, label: 'Main'}
  static readonly USERS: Link = {href: `${this.root}users`, label: 'Users'}
  static readonly ABOUT: Link = {href: `${this.root}about`, label: 'About'}
  static readonly LOGIN: Link = {href: `${this.root}auth/login`, label: 'Login'}
  static readonly SIGNUP: Link = {href: `${this.root}auth/signup`, label: 'Create an account'}
  static readonly ACCOUNT_AGREEMENT: Link = {
    href: `${this.root}legal/account_agreement`,
    label: 'Account agreement'
  }

  static getNavLinks(): Link[] {
    return [this.HOME, this.MAIN, this.USERS, this.ABOUT]
  }
}
