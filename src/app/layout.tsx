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
  title: "Diljan's Portfolio",
  description: "Personal Portfolio Website",
  icons: {
    icon: 'https://res.cloudinary.com/duqupsxnk/image/upload/v1741031043/Screenshot_2025-03-04_at_1.12.24_AM_yfl7ug.png',
  },
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
