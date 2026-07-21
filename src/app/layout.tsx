import type { Metadata } from "next";
import { Baloo_2, Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const brittany = localFont({
  src: "../fonts/BrittanySignature.ttf",
  variable: "--font-brittany",
  display: "swap",
});

const baloo = Baloo_2({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ramesh Rushantha Silva | Walk With RAMA",
  description:
    "From Colombo 05 to the open ocean. Travel vlogger, superyacht bosun, water sports instructor and musician. The story of Ramesh Rushantha Silva.",
  openGraph: {
    title: "Ramesh Rushantha Silva | Walk With RAMA",
    description: "From Colombo 05 to the open ocean.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${inter.variable} ${jetbrains.variable} ${brittany.variable} scroll-smooth`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
