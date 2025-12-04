import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clavier T9 des départements français",
  description:
    "Compose un numéro de département français (01 à 976) via un pavé T9 et accède au bon article Wikipédia en quelques secondes.",
  metadataBase: new URL("https://french-departments.vercel.app"),
  openGraph: {
    title: "Clavier T9 des départements français",
    description:
      "Compose un numéro de département français (01 à 976) via un pavé T9 et accède au bon article Wikipédia en quelques secondes.",
    siteName: "Départements T9",
    type: "website",
    url: "https://french-departments.vercel.app",
  },
  twitter: {
    card: "summary",
    title: "Clavier T9 des départements français",
    description:
      "Compose un numéro de département français et accède directement à l'article Wikipédia francophone correspondant.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
