import { useMutation } from "@tanstack/react-query";

const BLUSH_QUERY_KEY = "BLUSH_QUERY_KEY";

export function useBlush() {
    return useMutation({
        mutationKey: [ BLUSH_QUERY_KEY ],
        mutationFn: (image: any) => {
            return createImage(image);
        }
    });
}

async function createImage(image: any) {
    const options = {
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        method: 'POST',
    };

    const response = await fetch('/api/blusher', options);
    const data = await response.json();
    return data;
};

async function wait(image: any) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return "ok";
}
