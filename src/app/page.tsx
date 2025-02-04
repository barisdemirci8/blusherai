import BlusherForm from "@/components/image/blusherForm";

export default function Home() {

  return (
    <main className="grid auto-rows-min justify-items-center align-self-center content-center gap-6">
      <h1 className="text-6xl font-bold font-bubblegum text-muted-foreground">Blusher AI</h1>
      <p className="text-xl text-center max-w-2/3 bg-gradient-to-r from-[#24699d] to-[#791656] bg-clip-text text-transparent">
        Upload your image, blur parts of it that you don&apos;t want and let
        this &quot;fancy Chat-GPT wrapper&quot; generate a replacment based on
        your input
      </p>
      <BlusherForm />
    </main>
  );
}
