import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Secret Chance Calculator - Anime Warriors 3 (AW3)",
  description:
    "Calculate your Secret and Shiny Secret odds in Anime Warriors 3 (AW3). Supports Star Luck, Secret Chance boosts, probability milestones, pull graphs, and accurate hatch odds.",
  keywords: [
    "Anime Warriors 3",
    "AW3",
    "Secret Chance Calculator",
    "Shiny Secret Calculator",
    "AW3 Calculator",
    "Secret Odds",
    "Star Luck Calculator",
    "AW3 Secret Odds",
    "Roblox Anime Warriors 3",
  ],
  authors: [{ name: "Chirag Kashyap" }],
  creator: "Chirag Kashyap",
  applicationName: "Secret Chance Calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          {children}
          <Analytics />
        </TooltipProvider>
      </body>
    </html>
  );
}
