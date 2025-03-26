import BlusherForm from "@/components/image/blusherForm";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log("session: ", session);

  return (
    <main className="grid auto-rows-min justify-items-center align-self-center content-center gap-6">
      <h1 className="text-6xl font-bold font-bubblegum text-muted-foreground">
        Blusher AI
      </h1>
      <BlusherForm />
    </main>
  );
}
