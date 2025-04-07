"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Loader from "../ui/loader";
import { useToast } from "@/hooks/use-toast";
import { GeneratedImage } from "@/lib/actions/image.actions";
import { useFormContext } from "react-hook-form";
import { BlusherForm } from "./blusherForm";
import { Download, RotateCcw } from "lucide-react";

type GeneratedImageProps = {
  generatedImage: GeneratedImage;
  reset: () => void;
};

export default function GeneratedImageDisplay(props: GeneratedImageProps) {
  const { generatedImage, reset } = props;

  const { setValue } = useFormContext<BlusherForm>();
  const { toast } = useToast();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const image = new Image();

    if (generatedImage.format === "b64_json") {
      image.src = `data:image/png;base64,${generatedImage.b64String}`;
    }
    if (generatedImage.format === "url") {
      image.src = generatedImage.url;
    }

    image.onload = () => {
      imageRef.current = image;
      drawImageOnCanvas();
      setIsLoading(false);
    };
  }, []);

  const drawImageOnCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx && imageRef.current) {
      const MAX_WIDTH: number = 1024;
      let { width, height } = imageRef.current;

      canvas.width = width;
      canvas.height = height;
      const scaleX: number = canvas.width / imageRef.current.width;
      const scaleY: number = canvas.height / imageRef.current.height;
      const scale: number = Math.min(scaleX, scaleY);

      const scaledWidth: number = imageRef.current.width * scale;
      const scaledHeight: number = imageRef.current.height * scale;

      const offsetX: number = (canvas.width - scaledWidth) / 2;
      const offsetY: number = (canvas.height - scaledHeight) / 2;

      ctx.drawImage(
        imageRef.current,
        offsetX,
        offsetY,
        scaledWidth,
        scaledHeight,
      );
    }
  };

  const downloadBlob = (blob: Blob) => {
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "fancy-pic.png";
    a.click();
  };

  const downloadImage = async () => {
    setIsLoading(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx && imageRef.current) {
      // download image via url
      if (generatedImage.format === "url") {
        // fetch the image from the server
        const response = await fetch("/api/blusher/download", {
          method: "POST",
          body: JSON.stringify({ url: generatedImage.url }),
        });

        if (!response.ok) {
          toast({
            title: "Download failed.",
            description: "Could not download the image, try again later.",
            variant: "destructive",
            duration: 2000,
          });

          setIsLoading(false);
          return;
        }

        const imageBlob = await response.blob();
        downloadBlob(imageBlob);
      }

      // download image via b64
      if (generatedImage.format === "b64_json") {
        canvas.toBlob((blob) => {
          if (!blob) {
            toast({
              title: "Download failed.",
              description: "No image data available, try again later.",
              variant: "destructive",
              duration: 2000,
            });

            setIsLoading(false);
            return;
          }

          downloadBlob(blob);
        }, "image/png");
      }
    }

    setIsLoading(false);
  };

  const handleReset = () => {
    reset();
    setValue("image", null);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {isLoading ? <Loader /> : <p>Here is your image!</p>}
      <canvas
        hidden={isLoading}
        ref={canvasRef}
        className="border rounded-md shadow-xl cursor-pointer bg-muted md:max-w-[512px] lg:max-w-[1024px] max-h-[60vh] object-contain"
      />
      <div className="flex flex-row justify-center items-center gap-3">
        <Button
          className="cursor-pointer"
          variant="destructive"
          type="button"
          onClick={handleReset}
        >
          <RotateCcw />
          Reset
        </Button>
        <Button
          className="cursor-pointer"
          onClick={downloadImage}
          type="button"
        >
          <Download />
          Download
        </Button>
      </div>
    </div>
  );
}
