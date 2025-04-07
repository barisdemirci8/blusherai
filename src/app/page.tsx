import AnimatedKeyword from "@/components/image/animated-keyword";
import BlusherForm from "@/components/image/blusherForm";

export default function Home() {
  return (
    <main className="flex flex-col justify-start align-center gap-4 lg:gap-12 md:p-4 lg:p-8">
      {/*<section className="grid grid-rows-4 grid-cols-1 md:grid-cols-2 h-fit">*/}
      <section className="grid grid-flow-row md:grid-cols-2">
        <div className="p-4 lg:p-8 space-y-2 self-center">
          <div className="flex gap-2 text-4xl font-bold text-primary overflow-hidden whitespace-nowrap">
            <AnimatedKeyword />
            <h1 className="inline-block">your image</h1>
          </div>
          <p className="text-xl bg-gradient-to-r from-[#24699d] to-[#791656] bg-clip-text text-transparent">
            Upload your image, blur parts of it that you don&apos;t want and let
            this &quot;fancy Chat-GPT wrapper&quot; generate a replacment based
            on your input
          </p>
        </div>
        <div className="md:row-span-2 md:col-start-2 p-2 self-end">
          <img
            alt=""
            src="/images/ducks.png"
            className="w-2/3 h-auto object-fill rounded-xl"
          />
        </div>
        <div className="md:row-span-2 self-right p-2 justify-items-end self-center">
          <img
            alt=""
            src="/images/ducks_edited.png"
            className="w-2/3  h-auto object-fill rounded-xl"
          />
        </div>
        <div className="md:row-span-2 p-2">
          <img
            alt=""
            src="/images/ducks_final.png"
            className="w-2/3  h-auto object-fill rounded-xl"
          />
        </div>
      </section>
      <section className="flex flex-col items-center lg:gap-8 border-t-2 border-t-primary rounded-t-lg">
        <h1 className="text-2xl my-2 font-bold text-primary self-center md:self-start mt-2 lg:mt-8">
          try it yourself!
        </h1>
        <BlusherForm />
      </section>
    </main>
  );
}
