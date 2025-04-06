"use client";

import { useEffect, useRef, useState } from "react";
import { Slider } from "../ui/slider";
import { BlusherForm } from "./blusherForm";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { Paintbrush, RefreshCw, Upload } from "lucide-react";
import { isSupportedImageFormat } from "@/lib/utils";
import { Input } from "../ui/input";

type BlusherImageHandlerProps = {
  isLoading: boolean;
};

export default function BlusherImageHandler(props: BlusherImageHandlerProps) {
  const { isLoading } = props;

  const { watch, setValue, resetField } = useFormContext<BlusherForm>();
  const { toast } = useToast();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [brushSize, setBrushSize] = useState<number>(60);
  const originalImage: string | undefined = watch("originalImage");

  useEffect(() => {
    if (!originalImage) {
      return;
    }

    const image = new Image();
    image.src = originalImage;
    image.crossOrigin = "anonymous";

    image.onload = () => {
      imageRef.current = image;
      drawImageOnCanvas();
    };
  }, [originalImage]);

  const startDraw = () => {
    setIsDrawing(true);
  };

  const stopDraw = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;

      if (canvas) {
        canvas.toBlob((blob) => setValue("image", blob), "image/png");
      }
    }
  };

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
  };

  const handleBrushChange = (values: number[]) => {
    setBrushSize(values[0]);
  };

  const drawImageOnCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx && imageRef.current) {
      const MAX_WIDTH: number = 1024;
      let { width, height } = imageRef.current;

      // if (width > MAX_WIDTH) {
      //   const scaleFactor = MAX_WIDTH / width;
      //   width = MAX_WIDTH;
      //   height = height * scaleFactor;
      // }

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

      //canvas.toBlob((blob) => setValue("image", blob), "image/png");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleFiles(Array.from(event.dataTransfer.files));
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    handleFiles(Array.from(event.target.files || []));
  };

  const handleFiles = (files: File[]) => {
    // check any dropped files
    if (!files || files.length < 1) {
      toast({
        title: "Image Drop failed.",
        description: "No images were dropped.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    // only one image allowed
    if (files.length > 1) {
      toast({
        title: "Image Drop failed.",
        description: "You can only drop one image at a time.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    // check file type
    const file: File = files[0];
    if (!file || !isSupportedImageFormat(file.type)) {
      toast({
        title: "Not supported.",
        description: "You can only drop images in PNG format.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    // check file size
    if (file.size > 5000000) {
      toast({
        title: "Not supported.",
        description: "You can only drop images in PNG format.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageSrc: string = e.target?.result as string;
      if (!imageSrc) {
        return;
      }
      setValue("originalImage", imageSrc);
    };
    reader.readAsDataURL(file);
  };

  const downloadOriginal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx && imageRef.current) {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageRef.current.src;
      link.download = "original.png";
      link.click();
    }
  };

  const downloadMask = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx && imageRef.current) {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "mask.png";
      link.click();
    }
  };

  const handleReset = () => {
    drawImageOnCanvas();
    setValue("image", null);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 lg:gap-12 md:w-[60%]">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-3 w-full">
        <div className="flex gap-3 w-full">
          <p className="whitespace-nowrap flex justify-center items-center gap-2">
            <Paintbrush className="size-4" />
            Brush size:
          </p>
          <Slider
            className="cursor-pointer w-full"
            value={[brushSize]}
            onValueChange={handleBrushChange}
            step={1}
            max={100}
            min={1}
          />
        </div>
        <div className="flex justify-start gap-3">
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            type="button"
            className="cursor-pointer"
          >
            <Upload className="w-4 h-4 mr-2" />
            <Input
              ref={fileInputRef}
              onChange={handleFileSelection}
              type="file"
              accept="image/*"
              hidden={true}
            />
            Select Image
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            type="button"
            className="cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="border rounded-md shadow-xl cursor-pointer bg-muted md:max-w-[512px] lg:max-w-[1024px] max-h-[60vh] object-contain"
        onMouseDown={startDraw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onMouseMove={draw}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        height={400}
        width={400}
      />
    </div>
  );
}
