import Blusher from "@/components/image/blusherImageHandler";
import BlusherForm from "@/components/image/blusherForm";

export default function Home() {

  return (
    <main className="flex-1 flex flex-col justify-center items-center space-y-4">
      <h1 className="text-6xl font-bold font-bubblegum text-muted-foreground">Blusher AI</h1>
      <p className="text-xl text-center text-muted-foreground max-w-1/2">
        Upload your image, blur parts of it that you don&apos;t want and let
        this &quot;fancy Chat-GPT wrapper&quot; generate a replacment based on
        your input
      </p>
      <BlusherForm />
    </main>
  );
}
