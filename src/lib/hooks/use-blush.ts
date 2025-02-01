import { BlusherForm } from "@/components/image/blusherForm";
import { useMutation } from "@tanstack/react-query";

const BLUSH_QUERY_KEY = "BLUSH_QUERY_KEY";

export function useBlush() {
    return useMutation({
        mutationKey: [ BLUSH_QUERY_KEY ],
        mutationFn: (formData: FormData) => {
            return createImage(formData);
        }
    });
}

async function createImage(formData: FormData) {
    const options = {
        /* headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }, */
        method: 'POST',
        body: formData,
    };

    const response = await fetch('/api/blusher', options);
    const data = await response.json();
    return data;
};

async function wait(image: any) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return "ok";
}
