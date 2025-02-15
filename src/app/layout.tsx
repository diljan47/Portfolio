import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local';

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const dotMatrix = localFont({
  src: '../../public/fonts/dotmatrix.ttf',
  variable: '--font-dot-matrix'
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} ${dotMatrix.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
