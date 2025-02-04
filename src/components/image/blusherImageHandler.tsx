"use client";

import { useEffect, useRef, useState } from "react";
import { Slider } from "../ui/slider";
import { BlusherForm } from "./blusherForm";
import { useFormContext } from "react-hook-form";

export default function BlusherImageHandler() {

    const { setValue } = useFormContext<BlusherForm>();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [brushSize, setBrushSize] = useState<number>(60);

    useEffect(() => {
        const image = new Image();
        image.src = "/images/bambi.jpg";
        image.crossOrigin = "anonymous";

        image.onload = () => {
            imageRef.current = image;
            drawImageOnCanvas();
        }
    }, [])

    const startDraw = () => {
        setIsDrawing(true);
    }

    const stopDraw = () => {
        if (isDrawing) {

            setIsDrawing(false);
            const canvas = canvasRef.current;

            if (canvas) {
                canvas.toBlob((blob) => setValue("mask", blob), "image/png");
            }
        }
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) {
            return;
        }
       
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx) {

            // rect rendered on client
            const canvasRect = canvas.getBoundingClientRect(); 

            // get scale between set canvas dims and actually rendered canvas on client
            const scaleX: number = canvas.width / canvasRect.width;
            const scaleY: number = canvas.height / canvasRect.height;

            // position in the canvas
            const x: number = (e.clientX - canvasRect.left) * scaleX;
            const y: number = (e.clientY - canvasRect.top) * scaleY;

            // draw over the existing content
            ctx.globalCompositeOperation = "destination-out";

            ctx.beginPath();
            ctx.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(71, 120, 144, 0.5)";
            ctx.fill();
        }
    }

    const handleBrushChange = (values: number[]) => {
        setBrushSize(values[0]);
    }

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

            canvas.toBlob(blob => setValue("image", blob), "image/png");
        }
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx && imageRef.current) {

            // create canvas for the mask
            const maskCanvas = document.createElement("canvas");
            maskCanvas.width = canvas.width;
            maskCanvas.height = canvas.height;
            const maskCtx = maskCanvas.getContext("2d");

            if (maskCtx) {

                // draw original image into the mask
                /* const scaleX: number = canvas.width / imageRef.current.width;
                const scaleY: number = canvas.height / imageRef.current.height;
                const scale: number = Math.min(scaleX, scaleY);

                const scaledWidth: number = imageRef.current.width * scale;
                const scaledHeight: number = imageRef.current.height * scale;

                const offsetX: number = (canvas.width - scaledWidth) / 2;
                const offsetY: number = (canvas.height - scaledHeight) / 2;
                maskCtx.drawImage(imageRef.current, offsetX, offsetY, scaledWidth, scaledHeight);
                //maskCtx.drawImage(imageRef.current!, 0, 0);

                // apply the mask => only parts of existing content that overlap stay
                maskCtx.globalCompositeOperation = "destination-in";
                maskCtx.drawImage(canvas, 0, 0); */
                //maskCtx.drawImage(canvas, 0, 0);

                // download the image

                /* const dataUrl = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "mask.png";
                link.click(); */
            }
        }
        
    }

    return (
      <div className="flex flex-col justify-center items-center gap-3">
        <canvas
          ref={canvasRef}
          className="border rounded-md shadow-xl object-fit cursor-pointer w-128 h-128 bg-muted"
          width={1024}
          height={1024}
          onMouseDown={startDraw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onMouseMove={draw}
        />

        <div className="flex justify-center items-center gap-3 w-2/3 md:w-full">
          <p className="whitespace-nowrap">Brush size:</p>
          <Slider
            className="cursor-pointer"
            value={[brushSize]}
            onValueChange={handleBrushChange}
            step={1}
            max={100}
            min={1}
          />
        </div>
      </div>
    );
}
