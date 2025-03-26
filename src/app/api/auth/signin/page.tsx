import LoginForm from "@/components/auth/loginform";

export default function SignIn() {
  return (
    <main className="flex flex-col items-center md:p-4 lg:p-12">
      <h1 className="text-2xl place-self-start">Login</h1>

      <div className="flex flex-1 justify-center items-center">
        <LoginForm />
      </div>
    </main>
  );
}
