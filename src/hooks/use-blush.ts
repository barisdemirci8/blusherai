import { BlusherForm } from "@/components/image/blusherForm";
import { inpaintImage } from "@/lib/actions/image.actions";
import { useMutation } from "@tanstack/react-query";

export type ResponseFormat = "url" | "b64_json";
const BLUSH_QUERY_KEY = "BLUSH_QUERY_KEY";

export function useBlush() {
  return useMutation({
    mutationKey: [BLUSH_QUERY_KEY],
    mutationFn: (formData: BlusherForm) => {
      return inpaintImage(formData);
    },
  });
}

async function wait(image: any) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return "ok";
}
