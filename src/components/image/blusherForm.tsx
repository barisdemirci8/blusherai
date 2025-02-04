"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import BlusherImageHandler from "./blusherImageHandler";
import { Button } from "../ui/button";
import { useBlush } from "@/lib/hooks/use-blush";
import Loader from "../ui/loader";
import { useToast, toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import GeneratedImage from "./generatedImage";

const blusherFormSchema = z.object({
    prompt: z.string().nonempty({message: 'Please enter what you want to be edited in.'}),
    image: z.instanceof(Blob).nullable(),
    mask: z.instanceof(Blob).nullable().optional(),
});
export type BlusherForm = z.infer<typeof blusherFormSchema>;

export default function BlusherForm() {

    const { mutate, data, error, status, isPending } = useBlush();

    const form = useForm<BlusherForm>({
        resolver: zodResolver(blusherFormSchema),
        defaultValues: {
            prompt: "a lions head"
        }
    })

    const { control, handleSubmit } = form;

    const onSubmit = (formValues: BlusherForm) => {

        // convert blob to buffer
        if (formValues.image && formValues.mask) {

            const formData = new FormData();
            formData.append('prompt', formValues.prompt);
            formData.append('image', formValues.image);
            formData.append('mask', formValues.mask);

            mutate(formData);
        }
    }

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
        console.log("data: ", data);
        return(
            <GeneratedImage imageUrl={data.imageUrl}/>
        );
    }

    return (
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 flex flex-col justify-center items-center">
          <BlusherImageHandler />
                <p>{status}</p>
          <div className="grid grid-cols-5 gap-2 w-[90%] md:w-full justify-center items-center">
            <FormField
              name="prompt"
              control={control}
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormControl>
                    <Input {...field} className="focus-visible:ring-0 focus-visible:ring-offset-0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="hover:cursor-pointer" disabled={isPending}>
              Generate
            </Button>
          </div>
        </form>
      </Form>
    );
}
