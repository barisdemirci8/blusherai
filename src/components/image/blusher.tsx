"use client";

import { useRef, useState } from "react";

export default function Blusher() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [isDrawing, setIsDrawing] = useState<boolean>(false);

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
            ctx.arc(x, y, 50, 0, 2 * Math.PI);
            ctx.stroke();
        }

        //console.log('draw: ', e);
    }
    
    return(
        <div className="flex justify-center items-center cursor-pointer">
            
           {/* <div className="w-128 h-128">
                <img 
                    src={"/images/ducks.png"}
                    alt="test image"
                    className="object-fill rounded-sm"
                />
            </div>*/}
            
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
