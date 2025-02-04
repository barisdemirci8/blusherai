"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Loader from "../ui/loader";

type GeneratedImageProps = {
    imageUrl: string;
}

export default function GeneratedImage(props: GeneratedImageProps) {

    const { imageUrl } = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const image = new Image();
        image.src = imageUrl;

        image.onload = () => {
            imageRef.current = image;
            drawImageOnCanvas();
            setIsLoading(false);
        }
    }, [])

    const drawImageOnCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx && imageRef.current) {
            const scaleX: number = canvas.width / imageRef.current.width;
            const scaleY: number = canvas.height / imageRef.current.height;
            const scale: number = Math.min(scaleX, scaleY);

            const scaledWidth: number = imageRef.current.width * scale;
            const scaledHeight: number = imageRef.current.height * scale;

            const offsetX: number = (canvas.width - scaledWidth) / 2;
            const offsetY: number = (canvas.height - scaledHeight) / 2;

            ctx.drawImage(imageRef.current, offsetX, offsetY, scaledWidth, scaledHeight);
        }
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx && imageRef.current) {

            imageRef.current.crossOrigin = "anonymous";

            // img to data 
            const dataUrl = canvas.toDataURL("image/png");

            const a = document.createElement("a");
            a.href = dataUrl;
            a.download = "fancy-pic.png";
            a.click();
        }
    }

    return (
      <div className="flex flex-col justify-center items-center gap-3">
        {isLoading && <Loader />}
        <canvas
          hidden={isLoading}
          ref={canvasRef}
          className="border rounded-md shadow-xl object-fit cursor-pointer w-128 h-128"
          width={1024}
          height={1024}
        />
        <Button onClick={downloadImage}>Download</Button>
      </div>
    );
}
