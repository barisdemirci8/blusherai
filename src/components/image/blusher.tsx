"use client";

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

export default function Blusher() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [brushSize, setBrushSize] = useState<number>(20);

    const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        console.log('starting draw: ', e);
        setIsDrawing(true);
    }

    const stopDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        console.log('stop draw: ', e);
        setIsDrawing(false);
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {

        if (!isDrawing) {
            return;
        }
       
        //console.log('drawing')
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx) {
            const canvasRect = canvas.getBoundingClientRect(); 
            //console.log('canvas: ', canvas);
            console.log('canvas rect: ', canvasRect);
            
            //console.log('e: ', e) ;

            const x: number = e.clientX - canvasRect.left;
            const y: number = e.clientY - canvasRect.top;

            console.log('x: ', x);
            console.log('y: ', y);

            ctx.beginPath();
            ctx.arc(x, y, brushSize / 2, 0, 2 * Math.PI);
            ctx.stroke();
        }

        //console.log('draw: ', e);
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
    
    return (
      <div className="flex flex-col justify-center items-center cursor-pointer gap-3">
        {/* <div className="w-128 h-128">
                <img 
                    src={"/images/ducks.png"}
                    alt="test image"
                    className="object-fill rounded-sm"
                />
            </div>*/}
        <div className="flex justify-center items-center gap-3 w-full">
          <Slider
            value={[brushSize]}
            onValueChange={handleBrushChange}
            step={1}
            max={100}
            min={1}
          />
          <Button onClick={clearDrawing}>
            Reset
          </Button>
        </div>

        <canvas
          ref={canvasRef}
          className="border-2 border-red-200"
          width={500}
          height={500}
          onMouseDown={startDraw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onMouseMove={draw}
        />
      </div>
    );
}
