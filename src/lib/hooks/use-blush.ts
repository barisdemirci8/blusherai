import { useMutation } from "@tanstack/react-query";

export type ResponseFormat = 'url' | 'b64_json';
const BLUSH_QUERY_KEY = "BLUSH_QUERY_KEY";

export function useBlush() {
    return useMutation({
        mutationKey: [ BLUSH_QUERY_KEY ],
        mutationFn: (formData: FormData) => {
            return editImage(formData, 'url');
        }
    });
}

export function useBlushBase64() {
    return useMutation({
        mutationKey: [ BLUSH_QUERY_KEY ],
        mutationFn: (formData: FormData) => {
            return editImage(formData, 'b64_json');
        }
    });
}

async function editImage(formData: FormData, responseFormat: ResponseFormat) {

    formData.set('responseFormat', responseFormat);

    const options = {
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
