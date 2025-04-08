import BlusherForm from "@/components/image/blusherForm";

export default async function InpaintPage() {
  return (
    <main className="flex flex-col justify-start align-center gap-4 lg:gap-12 md:p-4 lg:p-8">
      <h1 className="text-2xl my-2 font-bold text-primary self-center md:self-start mt-2 lg:mt-8">
        Inpainting Tool
      </h1>
      <BlusherForm />
    </main>
  );
}
