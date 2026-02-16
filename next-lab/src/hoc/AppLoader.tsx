"use client";

import {setAuthState} from "@/store/authSlice";
import {useAppDispatch} from "@/hooks/hooks";
import {useSession} from "next-auth/react";
import {ReactNode, useEffect} from 'react';

const AppLoader = ({children}: {children: ReactNode}) => {
  const { data: session, status } = useSession();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAuthState({ status, user: session?.user }));
  }, [dispatch, session?.user, status]);

  return children;
};

export default AppLoader;
