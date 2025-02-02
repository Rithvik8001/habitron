import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/query-provider";

export const metadata: Metadata = {
  title: "Habitron - AI-Powered Habit Tracker",
  description: "Build better habits with AI-powered insights and tracking",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: [
    "habit tracking",
    "AI habits",
    "habit formation",
    "productivity",
    "self-improvement",
    "habit tracker",
    "goal tracking",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <QueryProvider>{children}</QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
