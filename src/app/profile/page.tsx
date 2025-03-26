import { auth } from "@/auth";
import LogoutForm from "@/components/auth/logout-form";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="flex flex-col items-center md:p-4 lg:p-12">
      <h1 className="text-2xl place-self-start">Profile Page</h1>

      <div className="flex flex-1 justify-center items-center">
        <LogoutForm />
      </div>
    </main>
  );
}
