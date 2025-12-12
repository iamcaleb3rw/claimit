import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

const sfPro = localFont({
  src: [
    {
      path: "./fonts/sfpro/SFProDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/sfpro/SFProDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/sfpro/SFProDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
});

const perfectlyNineties = localFont({
  src: [
    {
      path: "./fonts/pn/PerfectlyNineties-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/pn/PerfectlyNineties-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/pn/PerfectlyNineties-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/pn/PerfectlyNineties-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/pn/PerfectlyNineties-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/pn/PerfectlyNineties-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-perfectly-nineties",
});

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClaimIt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${sfPro.variable} ${perfectlyNineties.variable}`}
      >
        <body className={`font-sans antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
