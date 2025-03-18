import BlusherForm from "@/components/image/blusherForm";
import { createUser } from "@/components/user/user.service";
import { TUser } from "@/db/schema";

export default async function Home() {
  const savedUser = await createUser("baris.demirci93@hotmail.com", "asdf1234");

  return (
    <main className="grid auto-rows-min justify-items-center align-self-center content-center gap-6">
      <h1 className="text-6xl font-bold font-bubblegum text-muted-foreground">
        Blusher AI
      </h1>
      {savedUser.message}
      <BlusherForm />
    </main>
  );
}
