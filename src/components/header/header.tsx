import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { auth } from "@/auth";

export default async function Header() {
  const session = {};
  // const session = await auth();
  // console.log("session: ", session);

  return (
    <header className="bg-back">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1 gap-2">
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
        <div className="flex justify-end">
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
            <Link href={"/api/auth/signin"}>Login &rarr;</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
