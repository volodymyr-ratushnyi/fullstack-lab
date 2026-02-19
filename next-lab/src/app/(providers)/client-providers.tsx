'use client'
import { store } from "@/shared/store/store"
import {ReactNode} from "react"
import {Provider} from "react-redux"

export const ClientProviders = ({children}: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
