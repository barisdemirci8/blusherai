import AnimatedKeyword from "@/components/image/animated-keyword";
import BlusherForm from "@/components/image/blusherForm";

export default function Home() {
  return (
    <main className="flex flex-col justify-start align-center md:p-4 lg:p-8">
      {/*<section className="grid grid-rows-4 grid-cols-1 md:grid-cols-2 h-fit">*/}
      <section className="grid grid-flow-row md:grid-cols-2 min-h-screen">
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
            src="/images/bg_1_copy.png"
            className="w-2/3 h-auto object-fill rounded-xl"
          />
        </div>
        <div className="md:row-span-2 self-right p-2 justify-items-end self-center">
          <img
            alt=""
            src="/images/bg_1_copy.png"
            className="w-2/3  h-auto object-fill rounded-xl"
          />
        </div>
        <div className="md:row-span-2 p-2">
          <img
            alt=""
            src="/images/bg_1_copy.png"
            className="w-2/3  h-auto object-fill rounded-xl"
          />
        </div>
      </section>
      <section>
        <h1 className="text-2xl my-2 font-bold text-primary self-center">
          try it yourself!
        </h1>
        <BlusherForm />
      </section>
    </main>
  );
}
