import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(request: NextRequest) {
  
    /* const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: "an arsenal player from the past",
        n: 1,
        size: "1024x1024"
    }); */

    const response = await openai.images.edit({
        model: "dalle-e-2",
        
    });

    return NextResponse.json({message: 'ok', imageUrl: response.data[0].url});
}
