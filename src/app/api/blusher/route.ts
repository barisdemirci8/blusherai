import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(request: NextRequest) {

    throw new Error("error");
    console.log('incoming request: ');

    const formData = await request.formData();
    const prompt = formData.get('prompt') as string;
    const image = formData.get('image') as any;
    const mask = formData.get('mask') as any;

    /* const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: "an arsenal player from the past",
        n: 1,
        size: "1024x1024"
    }); */

    // this works just passing the file from the form data
    //const response = await openai.images.createVariation({ model: "dall-e-2", image: image, n: 1, size: "1024x1024" });

    const response = await openai.images.edit({
        image: image,
        mask: mask,
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    });

    console.log('response: ', response); 

    //return NextResponse.json({message: 'ok'});
    return NextResponse.json({message: 'ok', imageUrl: response.data[0].url});
}
