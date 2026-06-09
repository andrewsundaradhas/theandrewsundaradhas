import type { Metadata, Viewport } from "next";
import { Inter, Bowlby_One, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-face",
  display: "swap",
});

const display = Bowlby_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-face",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://andrewsundaradhas.dev"),
  title: "Andrew Sundaradhas — AI/ML Engineer & Robotics",
  description:
    "CS & Robotics engineer at VIT Chennai. Building autonomous drone systems, ML pipelines, and production AI products. Open to internships and research roles.",
  keywords: [
    "Andrew Sundaradhas",
    "ML Engineer",
    "Robotics",
    "VIT Chennai",
    "AI",
    "Drone Systems",
    "Python",
    "PyTorch",
    "Next.js",
  ],
  authors: [{ name: "Andrew Sundaradhas" }],
  creator: "Andrew Sundaradhas",
  openGraph: {
    title: "Andrew Sundaradhas — AI/ML Engineer",
    description:
      "Building at the intersection of ML, robotics, and autonomous systems.",
    url: "https://andrewsundaradhas.dev",
    siteName: "Andrew Sundaradhas",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrew Sundaradhas — AI/ML Engineer",
    description: "CS & Robotics · VIT Chennai · Building intelligent systems.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#dceeff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border focus:border-carbon focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
