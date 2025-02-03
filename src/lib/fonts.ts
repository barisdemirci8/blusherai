import { Bubblegum_Sans, Finger_Paint, Geist, Geist_Mono } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const fingerPaint = Finger_Paint({
    variable: "--font-finger-paint",
    subsets: ["latin"],
    weight: ["400"]
});

export const bubbleGums = Bubblegum_Sans({
    variable: "--font-bubblegum",
    subsets: ["latin"],
    weight: ["400"]
});
