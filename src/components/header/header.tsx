import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="bg-back border-1">
      <div className="container mx-auto px-4 py-2 flex justify-around items-center">
        <div className="text-white font-medium">Credits: 100</div>
        <div className="flex space-x-4">
          <Button variant="default" className="text-white cursor-pointer">
            <Link href={"/api/auth/signin"}>Sign Up</Link>
          </Button>
          <Button variant="default" className="text-white cursor-pointer">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
