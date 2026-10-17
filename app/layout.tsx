import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GraminGCC — Rural Talent. Global Impact.",
  description:
    "A demand-led GCC readiness platform connecting skills, preparation and global work opportunities.",
  applicationName: "GraminGCC",
  keywords: [
    "GraminGCC",
    "GCC readiness",
    "talent development",
    "skill mapping",
    "global capability centres"
  ],
  openGraph: {
    title: "GraminGCC — Rural Talent. Global Impact.",
    description:
      "Readiness is the missing link between talent and global work.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#123e33",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}