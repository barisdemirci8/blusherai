"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import BlusherImageHandler from "./blusherImageHandler";
import { Button } from "../ui/button";
import { useBlush } from "@/hooks/use-blush";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
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
  originalImage: z.string().optional(),
});
export const inpaintRequestSchema = blusherFormSchema.omit({
  originalImage: true,
});
export type BlusherForm = z.infer<typeof blusherFormSchema>;

export default function BlusherForm() {
  const { mutate, data, error, isPending, reset } = useBlush();

  const form = useForm<BlusherForm>({
    resolver: zodResolver(blusherFormSchema),
    defaultValues: {
      prompt: "a lion head",
      size: "1024x1024",
      responseFormat: "url",
    },
  });

  const { control, handleSubmit, resetField, watch } = form;
  const image = watch("image");

  const onSubmit = (formValues: BlusherForm) => {
    const { originalImage, ...rest } = formValues;
    mutate(rest);
    resetField("image", { defaultValue: null });
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

  if (data && !data.generatedImage) {
    return (
      <div className="flex flex-col justify-center items-center gap-3">
        Something went wrong.
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 flex flex-col justify-center items-center w-[90%] my-auto"
      >
        {data && data.generatedImage ? (
          <GeneratedImageDisplay
            generatedImage={data.generatedImage}
            reset={reset}
          />
        ) : (
          <BlusherImageHandler isLoading={isPending} />
        )}
        {image && !data && (
          <div
            id="blush"
            className="grid grid-cols-5 gap-2 w-full md:w-[60%] justify-center items-center animate-fade-down"
          >
            <FormField
              name="prompt"
              control={control}
              disabled={isPending}
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
        )}
      </form>
    </FormProvider>
  );
}
