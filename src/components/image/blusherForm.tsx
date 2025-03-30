"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import BlusherImageHandler from "./blusherImageHandler";
import { Button } from "../ui/button";
import { useBlush } from "@/hooks/use-blush";
import Loader from "../ui/loader";
import { useToast, toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import GeneratedImage from "./generatedImage";
import GeneratedImageDisplay from "./generatedImage";

export const blusherFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .nonempty({ message: "Please enter what you want to be edited in." }),
  image: z.instanceof(Blob).nullable().optional(),
  mask: z.instanceof(Blob).nullable().optional(),
  size: z.enum(["256x256", "512x512", "1024x1024"]),
  responseFormat: z.enum(["url", "b64_json"]),
});
export type BlusherForm = z.infer<typeof blusherFormSchema>;

export default function BlusherForm() {
  const { mutate, data, error, status, isPending } = useBlush();

  const form = useForm<BlusherForm>({
    resolver: zodResolver(blusherFormSchema),
    defaultValues: {
      prompt: "a lion head",
      size: "1024x1024",
      responseFormat: "url",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (formValues: BlusherForm) => {
    mutate(formValues);

    // convert blob to buffer
    // if (formValues.image && formValues.mask) {
    // const formData = new FormData();
    // formData.append("prompt", formValues.prompt);
    // formData.append("image", formValues.image);
    // formData.append("mask", formValues.mask);
    // formData.append("size", formValues.size);

    // }
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Failed",
        description: "Could not generate image, try later.",
        variant: "destructive",
      });
    }
  }, [error]);

  if (isPending) {
    return (
      <div className="flex flex-col justify-center items-center gap-3">
        <Loader />
      </div>
    );
  }

  if (data) {
    if (!data.generatedImage) {
      return <div>{data.message}</div>;
    }
    return <GeneratedImageDisplay generatedImage={data.generatedImage} />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 flex flex-col justify-center items-center md:max-w-2/3 lg:max-w-1/2"
      >
        <p className="text-xl text-center max-w-2/3 bg-gradient-to-r from-[#24699d] to-[#791656] bg-clip-text text-transparent">
          Upload your image, blur parts of it that you don&apos;t want and let
          this &quot;fancy Chat-GPT wrapper&quot; generate a replacment based on
          your input
        </p>
        <BlusherImageHandler />
        <p>{status}</p>
        <div className="grid grid-cols-5 gap-2 w-[90%] justify-center items-center">
          <FormField
            name="prompt"
            control={control}
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormControl>
                  <Input
                    {...field}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="hover:cursor-pointer"
            disabled={isPending}
          >
            Generate
          </Button>
        </div>
      </form>
    </Form>
  );
}
