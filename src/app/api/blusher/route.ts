import { ResponseFormat } from "@/lib/hooks/use-blush";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(request: Request) {

    const formData = await request.formData();
    const prompt = formData.get('prompt') as string;
    const image = formData.get('image') as any;
    const mask = formData.get('mask') as any;
    const responseFormat = formData.get('responseFormat') as ResponseFormat;

    try {
        const response = await openai.images.edit({
            image: image,
            mask: mask,
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: responseFormat,
        });

        if (responseFormat === 'url') {
            return Response.json({imageUrl: response.data[0].url});
        }

        // should not be really used
        if (responseFormat === 'b64_json') {
            return Response.json({imageUrl: response.data[0].b64_json});
        }

        return Response.error();
    }
    catch (error: any) {
        console.error('error generating image: ', error);
        return Response.error();
    }
}
