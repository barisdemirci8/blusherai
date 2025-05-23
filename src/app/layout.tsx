import type { Metadata } from "next";
import "./globals.css";
import { bubbleGums, fingerPaint, geistMono, geistSans } from "@/lib/fonts";
import Header from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "blusherai",
  description: "edit images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} ${bubbleGums.variable} font-geist-mono grid grid-rows-[auto_1fr_auto] min-h-screen bg-[url('/background.svg')]`}
        >
          <Header />
          {children}
          <Footer />
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
