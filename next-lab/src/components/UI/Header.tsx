"use client"

import {setAuthState} from "@/actions/user/authSlice";
import {signOutFunc} from "@/actions/user/userActions";
import {AuthStatuses, metaData} from "@/constants/constants";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@heroui/react";
import LoginModal from "@UI/modals/LoginModal";
import RegistrationModal from "@UI/modals/RegistrationModal";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {useState} from "react";
import wolf from "../../../public/cool_wolf_sunglasses.svg";
import Link from "next/link";

export default function Header() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  const navItems = [
    {href: '/', label: 'Home'},
    {href: '/main', label: 'Main'},
    {href: '/about', label: 'About'},
  ];

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
    <Navbar style={{height: metaData.headerHeight}}>
      <NavbarBrand>
        <Link href={"/"} className={"flex items-center gap-1"}>
          <Image src={wolf} alt={"Logo wolf"} width={46}/>
          <p className="font-bold text-inherit h-fit">{metaData.title}</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map(({href, label}) => <NavbarItem key={href}>
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
              ? <Button color="primary" variant="flat" onPress={signOut}>
                Sign out
              </Button>
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
