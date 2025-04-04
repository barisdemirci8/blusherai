import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isSupportedImageFormat = (imageFormat: string): boolean => {
  return (
    imageFormat === "image/png" ||
    imageFormat === "image/jpeg" ||
    imageFormat === "image/webp"
  );
};
