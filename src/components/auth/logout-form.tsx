"use client";

import { Button } from "../ui/button";
import { logout } from "@/lib/actions/auth.actions";
import { LogOut } from "lucide-react";

export default function LogoutForm() {
  return (
    <div>
      <Button
        className="cursor-pointer"
        variant="destructive"
        onClick={() => logout()}
      >
        <p>Logout</p>
        <LogOut size={20} />
      </Button>
    </div>
  );
}
