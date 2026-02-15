"use server";

import {ILoginFormData, IRegisterFormData} from "@/types/formData";
import {saltAndHashPassword, signIn, signOut} from "@/utils/auth";
import prisma from "@/utils/db";

export const registerUser = async ({email, password}: IRegisterFormData) => {
  try {
    const pwHash = await saltAndHashPassword(password);
    const existingUser = await prisma.user.findUnique({where: { email }});
    if (existingUser) {
      return { error: "User with the email is existing"};
    }
    return await prisma.user.create({data: {email, password: pwHash}});
  } catch (e) {
    console.error(e);
    return {error: "Error during registration"};
  }
};

export const signInWithCredentials = async ({email, password}: ILoginFormData) => {
  try {
    return await signIn("credentials", {email, password, redirect: false});
  } catch (e) {
    console.error(e);
    return {error: "Error during sign in"};
  }
};

export const signOutFunc = async () => {
  try {
    return await signOut({ redirect: false });
  } catch (e) {
    console.error(e);
    return {error: "Error during sign out"};
  }
};
