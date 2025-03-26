"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions/auth.actions";
import { FaGoogle } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

export default function LoginForm() {
  const handleProviderLogin = (provider: string) => {
    login(provider);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Button
        className="cursor-pointer w-full"
        onClick={() => handleProviderLogin("google")}
      >
        <FaGoogle size={20} />
        <p>Login with Google</p>
      </Button>
      <Button
        className="cursor-pointer"
        onClick={() => handleProviderLogin("discord")}
      >
        <FaDiscord size={20} />
        <p>Login with Discord</p>
      </Button>
    </div>
  );
}
