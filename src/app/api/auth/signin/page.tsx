import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  const handleProviderLogin = (provider: string) => {
    signIn(provider);
  };

  return (
    <main className="">
      {/* <Button onClick={() => handleProviderLogin("google")}>
        <FaGoogle size={20} />
        <p>Login with Google</p>
      </Button> */}
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    </main>
  );
}
