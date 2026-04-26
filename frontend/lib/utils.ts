import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { authClient } from "./auth-client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function signInTwitter() {
  const data = await authClient.signIn.social({
    provider: "twitter",

    callbackURL: "/dashboard",

    errorCallbackURL: "/login",

    newUserCallbackURL: "/welcome",

    disableRedirect: false,
  });

  return data;
}
