"use client"

import {signOutFunc} from "@/auth/auth-actions";
import {sizes} from "@/config/layouts.config";
import {PagesLinkConfig} from "@/config/pages-url.config";
import {metaData} from "@/config/seo.config";
import {AuthStatuses} from "@/constants/constants";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {setAuthState} from "@/store/authSlice";
import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/react";
import LoginModal from "@UI/modals/LoginModal";
import RegistrationModal from "@UI/modals/RegistrationModal";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import wolf from "../../../public/cool_wolf_sunglasses.svg";

export default function Header() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const loading = useAppSelector((state) => state.auth.loading);
  const email = useAppSelector((state) => state.auth.user?.email);
  const dispatch = useAppDispatch();

  const pathName = usePathname();

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const signOut = async () => {
    await signOutFunc();
    dispatch(setAuthState({
      status: AuthStatuses.UNAUTHENTICATED,
      user: null,
    }));
  }

  return (
    <Navbar style={{height: sizes.headerHeight}}>
      <NavbarBrand>
        <Link href={PagesLinkConfig.HOME} className={"flex items-center gap-1"}>
          <Image src={wolf} alt={"Logo wolf"} width={46}/>
          <p className="font-bold text-inherit h-fit">{metaData.title}</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {PagesLinkConfig.getNavLinks().map(({href, label}) => <NavbarItem key={href}>
          <Link
            href={href}
            scroll={false}
            className={`px-3 py-1
              ${pathName === href
                ? "text-blue-500"
                : "text-foreground hover:text-blue-300 transition-colors duration-200"}
            `}
          >
            {label}
          </Link>
        </NavbarItem>)}
      </NavbarContent>
      <NavbarContent justify="end">
        {loading
          ? <>...Loading</>
          :<NavbarItem>
            {isAuth
              ? <>
                {email}
                <Button color="primary" variant="flat" onPress={signOut}>
                  Sign out
                </Button>
              </>
              : <Button color="primary" variant="flat" onPress={() => setIsLoginOpen(true)}>
                Sign in
              </Button>}
          </NavbarItem>}
        <NavbarItem>
          <Button color="primary" variant="flat" onPress={() => setIsRegistrationOpen(true)}>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}/>
      <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)}/>
    </Navbar>
  );
}
