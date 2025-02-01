"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import BlusherImageHandler from "./blusherImageHandler";
import { Button } from "../ui/button";
import { useBlush } from "@/lib/hooks/use-blush";

const blusherFormSchema = z.object({
    prompt: z.string().nonempty({message: 'Prompt can not be empty.'}),
    image: z.instanceof(Blob).nullable(),
});
export type BlusherForm = z.infer<typeof blusherFormSchema>;

export default function BlusherForm() {

    const { mutate, data, error, isPending } = useBlush();
    console.log('data: ', data);

    const form = useForm<BlusherForm>({
        resolver: zodResolver(blusherFormSchema),
        defaultValues: {
            prompt: "a lions head"
        }
    })

    const { control, handleSubmit } = form;

    const onSubmit = async (formValues: BlusherForm) => {
        console.log('submitting form: ', formValues);

        // convert blob to buffer
        if (formValues.image) {
            const arrayBuffer = await formValues.image.arrayBuffer();

            const formData = new FormData();
            formData.append('prompt', formValues.prompt);
            formData.append('image', formValues.image);

            mutate(formData);
        }
    }

    return (
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <BlusherImageHandler />
          <div className="grid grid-cols-5 gap-2">
            <FormField
              name="prompt"
              control={control}
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="hover:cursor-pointer">
              Generate
            </Button>
          </div>
        </form>
      </Form>
    );
}
