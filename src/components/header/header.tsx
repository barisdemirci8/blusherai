"use client";

import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useSession } from "next-auth/react";

export default function Header() {
  const session = useSession();
  console.log("session: ", session);

  return (
    <header className="bg-back">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex justify-end">
          {session && session.data?.user ? (
            <a className="flex justify-center items-center gap-2 cursor-pointer">
              <p className="hidden md:inline-block text-primary lg:text-lg font-finger-paint">
                {session.data.user?.name}
              </p>
              <Avatar className="size-12">
                <AvatarImage src={session.data?.user.image || ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </a>
          ) : (
            <Link href={"/api/auth/signin"}>Login &rarr;</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
