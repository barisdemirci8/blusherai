"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import NavbarLink from "./navbar-link";

type MobileMenuProps = {
  session: Session | null;
};

export default function MobileMenu({ session }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex md:hidden">
      <Drawer open={open} onOpenChange={setOpen} direction="left">
        <DrawerTrigger asChild>
          {open ? (
            <X className="transition-opacity duration-1000 ease-in-out" />
          ) : (
            <Menu className="transition-opacity duration-1000 ease-in-out " />
          )}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left border-b">
            <DrawerTitle className="md:flex justify-end">
              {session && session.user ? (
                <a
                  className="flex justify-center items-center gap-2 cursor-pointer"
                  href="/profile"
                >
                  <p className="hidden md:inline-block text-primary lg:text-lg font-finger-paint">
                    {session.user?.name}
                  </p>
                  <Avatar className="size-12">
                    <AvatarImage src={session?.user.image || ""} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </a>
              ) : (
                <Button asChild variant="ghost" className="bg-transparent">
                  <Link href={"/api/auth/signin"}>Login &rarr;</Link>
                </Button>
              )}
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-4 font-bold text-lg text-primary p-8">
            <NavbarLink
              display="Tool"
              path="/inpaint"
              callback={() => setOpen(false)}
            />
            <NavbarLink
              display="How to"
              path="/howto"
              callback={() => setOpen(false)}
            />
            <NavbarLink
              display="Pricing"
              path="/pricing"
              callback={() => setOpen(false)}
            />
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
