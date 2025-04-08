import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { auth } from "@/auth";
import { Button } from "../ui/button";
import NavbarLink from "./navbar-link";
import MobileMenu from "./mobile-menu";

export default async function Header() {
  const session = {};

  return (
    <header className="bg-back">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        {/* left side */}
        <div className="flex gap-2">
          {/* mobile  */}
          <MobileMenu session={session} />
          {/* desktop  */}
          <div className="hidden md:flex gap-3">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <h1 className="text-2xl font-bold font-bubblegum text-muted-foreground">
              Blusher AI
            </h1>
          </div>
        </div>
        {/* middle */}
        <div className="hidden md:flex flex-1 gap-4 font-bold text-xl text-primary translate-x-[20%]">
          <NavbarLink display="Tool" path="/inpaint" />
          <div className="h-6 border-l-4 border-border"></div>
          <NavbarLink display="How to" path="/howto" />
          <div className="h-6 border-l-4 border-border"></div>
          <NavbarLink display="Pricing" path="/pricing" />
        </div>
        {/* right side */}
        <div className="flex gap-3 md:hidden">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
          <h1 className="text-2xl font-bold font-bubblegum text-muted-foreground">
            Blusher AI
          </h1>
        </div>
        <div className="hidden md:flex justify-end">
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
            <Button asChild variant="outline" className="bg-transparent">
              <Link href={"/api/auth/signin"}>Login &rarr;</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
