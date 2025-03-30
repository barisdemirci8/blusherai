"use server";

import { BlusherForm } from "@/components/image/blusherForm";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type UrlImage = {
  format: "url";
  url: string;
};

export type Base64Image = {
  format: "b64_json";
  b64String: string;
};

export type GeneratedImage = UrlImage | Base64Image;

export type InpaintResponse = {
  message?: string;
  generatedImage?: GeneratedImage;
};

export const inpaintImage = async (
  blusherData: BlusherForm,
): Promise<InpaintResponse> => {
  const configuredProvider: string = process.env.APP_MODEL_PROVIDER || "";

  console.log("blusher data: ", blusherData);

  switch (configuredProvider) {
    case "openai":
      return inpaintOpenAi(blusherData);
    case "stabilityai":
      return inpaintStabilityAi(blusherData);
    default:
      console.log(
        `inpaintImage: provider not configured ${configuredProvider}`,
      );
      return {
        message: "Something went wrong on the server side, try again later.",
      };
  }
};

const inpaintOpenAi = async (data: BlusherForm): Promise<InpaintResponse> => {
  try {
    // if no mask is provided, the image has transparent pixels defining the mask
    const maskProvided: boolean = !!data.mask;
    const response = await openai.images.edit({
      image: data.image as any,
      mask: data.mask as any,
      prompt: data.prompt,
      n: 1,
      size: data.size,
      response_format: data.responseFormat,
    });

    if (!response) {
      return { message: "Could not generate Image." };
    }

    if (data.responseFormat === "url") {
      return {
        generatedImage: {
          format: "url",
          url: response.data[0].url || "",
        },
      };
    }

    if (data.responseFormat === "b64_json") {
      return {
        generatedImage: {
          format: "b64_json",
          b64String: response.data[0].b64_json || "",
        },
      };
    }

    return { message: "Could not generate Image." };
  } catch (error) {
    console.error("inpaintOpenAi: ", error);
    return { message: "Error while generating Image, try again later." };
  }
};

const inpaintStabilityAi = async (
  data: BlusherForm,
): Promise<InpaintResponse> => {
  try {
    const sdFormData = new FormData();
    sdFormData.set("image", data.image as any);
    sdFormData.set("prompt", data.prompt);
    //sdFormData.set("mask", mask);

    const url: string = `https://api.stability.ai/v2beta/stable-image/edit/inpaint`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_AI_API_KEY!}`,
        Accept: "application/json",
      },
      body: sdFormData,
    });

    if (!response || response.status !== 200) {
      console.log(
        `inpaintStabilityAi: response not 200. code: ${response.status}, statusText: ${response.statusText}`,
      );
      return { message: "Could not genreate Image, try again later." };
    }

    const responseData = await response.json();
    return {
      generatedImage: {
        format: "b64_json",
        b64String: responseData.image,
      },
    };
  } catch (error) {
    console.error("inpaintStabilityAi: ", error);
    return { message: "Error while generating Image, try again later." };
  }
};
