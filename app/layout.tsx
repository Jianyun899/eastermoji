import type { Metadata } from "next";
import { Inter, Pacifico } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400", variable: "--font-pacifico" });

export const metadata: Metadata = {
  title: "Easter Emoji Copy & Paste 🐰🥚 - EasterHub",
  description: "Copy the cutest Easter emojis including bunnies, eggs, flowers and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pacifico.variable} font-sans antialiased bg-orange-50 text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
