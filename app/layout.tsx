import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Habitron - AI-Powered Habit Tracking",
  description:
    "Build better habits with AI-powered insights, streak tracking, and personalized motivation. Track daily, weekly, and monthly habits with our modern, minimalistic app.",
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
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
