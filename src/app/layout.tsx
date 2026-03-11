import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FooterSection from "@/components/home/FooterSection";
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
  title: "Agus Pranyoto - Portfolio & Blog",
  description:
    "Personal portfolio and blog of Agus Pranyoto, a web developer specializing in frontend and full-stack development. Showcasing projects, experience, and technical insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-1">
          {children}
        </main>
        <FooterSection />
      </body>
    </html>
  );
}
