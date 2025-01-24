import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/lib/fonts";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

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
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[auto_1fr_auto] min-h-screen`}
      >
            <Header />
        {children}
            <Footer />
      </body>
    </html>
  );
}
