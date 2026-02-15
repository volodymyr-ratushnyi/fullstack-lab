"use client";

import {setAuthState} from "@/actions/user/authSlice";
import {useAppDispatch} from "@/hooks/hooks";
import {useSession} from "next-auth/react";
import {ReactNode, useEffect} from 'react';

const AppLoader = ({children}: {children: ReactNode}) => {
  const { data: session, status } = useSession();

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(status, session?.user);
    dispatch(setAuthState({ status, user: session?.user }));
  }, [dispatch, session?.user, status]);

  return children;
};

export default AppLoader;
