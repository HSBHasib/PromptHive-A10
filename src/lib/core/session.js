"use server"

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "../auth";

// Get User Data
export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};


// Get User Token
export const getUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.session?.token || null;
};


// Get User Role
export const requireRole = async (role) => {
  const user = await getUserSession();

  if (!user) {
    redirect("/");
  }

  if (user?.role !== role) {
    redirect("/unauthorized");
  }

  return user;
};

