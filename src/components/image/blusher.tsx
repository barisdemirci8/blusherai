"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

export default function Blusher() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [brushSize, setBrushSize] = useState<number>(30);

    useEffect(() => {
        const image = new Image();
        image.src = "/images/ducks.png";
        image.crossOrigin = "anonymous";

        image.onload = () => {
            console.log('image width: ', image.width);
            console.log('image height: ', image.height);
            imageRef.current = image;
            drawImageOnCanvas();
        }
    }, [])

    const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
    }

    const stopDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(false);
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

            ctx.beginPath();
            ctx.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(154, 148, 188, 0.15)";
            ctx.fill();
        }
    }

    const clearDrawing = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
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

            console.log('scale width: ', scaleX);
            console.log('scale height: ', scaleY);

            const scale: number = Math.min(scaleX, scaleY);
            console.log('scale: ', scale);

            const scaledWidth: number = imageRef.current.width * scale;
            const scaledHeight: number = imageRef.current.height * scale;
            console.log('scaled width: ', scaledWidth);
            console.log('scaled height: ', scaledHeight);

            const offsetX: number = (canvas.width - scaledWidth) / 2;
            const offsetY: number = (canvas.height - scaledHeight) / 2;
            console.log('offset x: ', offsetX);
            console.log('offset y: ', offsetY);

            ctx.drawImage(imageRef.current, offsetX, offsetY, scaledWidth, scaledHeight);
        }
    };

    const loadImage = () => {
        // just for testing
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx && imageRef.current) {
            ctx.drawImage(imageRef.current, 0, 0);
        }
    }
    

    return (
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="w-128 h-128">
                <img 
                    src={"/images/ducks.png"}
                    alt="test image"
                    className="object-fill rounded-sm"
                />
            </div>
        <div className="flex justify-center items-center gap-3 w-full">
          <Slider
            className="cursor-pointer"
            value={[brushSize]}
            onValueChange={handleBrushChange}
            step={1}
            max={100}
            min={1}
          />
          <Button className="hover:cursor-pointer" onClick={clearDrawing}>
            Reset
          </Button>
          <Button className="hover:cursor-pointer" onClick={loadImage}>
            Load 
          </Button>
        </div>

        <canvas
          ref={canvasRef}
          className="border-2 border-red-200 object-fit cursor-pointer w-128 h-128"
          width={1024}
          height={1024}
          onMouseDown={startDraw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onMouseMove={draw}
        />
      </div>
    );
}
