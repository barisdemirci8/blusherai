"use client";

import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react"; // Add the appropriate import

export default function SignIn() {
  const handleProviderLogin = (provider: string) => {
    signIn(provider);
  };

  return (
    <main className="">
      <Button onClick={() => handleProviderLogin("google")}>
        <FaGoogle size={20} />
        <p>Login with Google</p>
      </Button>
    </main>
  );
}
