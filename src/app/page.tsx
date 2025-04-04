import AnimatedKeyword from "@/components/image/animated-keyword";
import BlusherForm from "@/components/image/blusherForm";

export default function Home() {
  return (
    <main className="flex flex-col justify-start align-center lg:p-12">
      <section className="lg:p-8 lg:max-w-1/2 bg-red-200">
        <div className="flex gap-2 text-4xl font-bold text-muted-foreground overflow-hidden whitespace-nowrap">
          <AnimatedKeyword />
          <h1 className="inline-block">your image</h1>
        </div>
        <p className="text-xl bg-gradient-to-r from-[#24699d] to-[#791656] bg-clip-text text-transparent">
          Upload your image, blur parts of it that you don&apos;t want and let
          this &quot;fancy Chat-GPT wrapper&quot; generate a replacment based on
          your input
        </p>
      </section>
      {/* <BlusherForm /> */}
    </main>
  );
}
