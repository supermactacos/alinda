import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ['400'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linda R. Olsson Inc., Realtor",
  description: "Palm Beach FL Luxury Homes & Condos - Linda R. Olsson Inc., Realtor",
  icons: {
    icon: "http://www.lindaolsson.com/flogo.svg",
    apple: "http://www.lindaolsson.com/flogo.svg",
    shortcut: "http://www.lindaolsson.com/flogo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="http://www.lindaolsson.com/flogo.svg" />
      </head>
      <body
        className={`${instrumentSerif.variable} ${geistMono.variable} font-serif antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
