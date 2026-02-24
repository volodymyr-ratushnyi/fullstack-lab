import {Avatar} from "@/entities/user"
import {auth, signIn, signOut} from "@/features/auth"
import {ServerButton} from "@/shared/ui"
import {Session} from "next-auth"
import style from './UserMenu.module.scss'

export const UserMenu = async () => {
  const session: Session | null = await auth()
  const signInAction = async () => {
    "use server"
    await signIn("github")
  }
  const signOutAction = async () => {
    "use server"
    await signOut()
  }
  console.log(session)
  return (
    <div className={style.userMenu}>
      {session
        ? <>
          <Avatar image={session.user?.image || ''}/>
          <ServerButton action={signOutAction}>Sign out</ServerButton>
        </>
        : <ServerButton action={signInAction}>Sign in</ServerButton>}
    </div>
  )
}
