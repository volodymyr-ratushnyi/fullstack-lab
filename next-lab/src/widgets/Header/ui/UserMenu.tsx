"use client"
//TODO: Will be decompose
import {AuthStatuses} from "@/shared/constants/constants"
import {useAppDispatch, useAppSelector} from "@/shared/hooks/hooks"
import { setAuthState } from "@/shared/store/authSlice"


const UserMenu = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const loading = useAppSelector((state) => state.auth.loading)
  const email = useAppSelector((state) => state.auth.user?.email)
  const dispatch = useAppDispatch()


  const signOut = async () => {
    dispatch(setAuthState({
      status: AuthStatuses.UNAUTHENTICATED,
      user: null,
    }))
  }
  return <div>
      {loading
        ? <>...Loading</>
        :<div>
          {isAuth
            ? <>
              {email}
              <button onClick={signOut}>
                Sign out
              </button>
            </>
            : <button>
              Sign in
            </button>}
        </div>}
      <div>
        <button>
          Sign Up
        </button>
      </div>
  </div>
}

export default UserMenu
