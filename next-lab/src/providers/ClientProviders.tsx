"use client"

import { store } from "@/store/store";
import {HeroUIProvider} from '@heroui/react'
import {ReactNode} from "react";
import {Provider} from "react-redux";

export default function ClientProviders({children}: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
    </Provider>
  )
}
