import {AuthStatuses} from "@/shared/constants/constants"
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { Session } from "next-auth"
import {useSession} from "next-auth/react"

type SessionStatus = ReturnType<typeof useSession>["status"];

type Payload = PayloadAction<Omit<IAuthState, "isAuth" | "loading">>

interface IAuthState {
  isAuth: boolean;
  loading: boolean;
  status: SessionStatus;
  user: Session["user"] | null;
}

const initialState: IAuthState = {
  isAuth: false,
  loading: true,
  status: AuthStatuses.LOADING,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, {payload}: Payload) => {
      state.isAuth = payload.status === AuthStatuses.AUTHENTICATED
      state.loading = payload.status === AuthStatuses.LOADING
      state.status = payload.status
      state.user = payload.user
    },
  }
})

export const { setAuthState } = authSlice.actions

export default authSlice.reducer
