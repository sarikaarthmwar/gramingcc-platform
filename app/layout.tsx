import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://gramingcc-platform-bojr1xu7w-sarikaaa-5716s-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "GraminGCC | Rural Talent. Global Impact.",
  description:
    "Connecting real GCC demand with talent through skill mapping, focused preparation and evidence of readiness.",
  applicationName: "GraminGCC",
  keywords: [
    "GraminGCC",
    "GCC readiness",
    "rural talent",
    "talent development",
    "skill mapping",
    "global capability centres"
  ],
  openGraph: {
    title: "GraminGCC | Talent is everywhere. Readiness is the bridge.",
    description:
      "A demand-led GCC readiness platform connecting skills, preparation and global work opportunities.",
    url: siteUrl,
    siteName: "GraminGCC",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "GraminGCC — Rural Talent. Global Impact."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "GraminGCC | Rural Talent. Global Impact.",
    description:
      "Connecting real GCC demand with talent through skill mapping, focused preparation and evidence of readiness.",
    images: ["/opengraph-image"]
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
