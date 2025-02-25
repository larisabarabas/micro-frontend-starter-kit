"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import {loadRemoteComponentStyle} from "../utils/loadRemoteComponent"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load Tailwind styles from mfeWidgets
    loadRemoteComponentStyle<{ default: string }>(
      'http://localhost:3005/remoteEntry.js',
      'mfeWidgets',
      './tailwind'
    ).then((module) => {
      if (module.default) {
        const style = document.createElement('style');
        style.innerHTML = module.default;
        document.head.appendChild(style);
      }
    }).catch(console.error);
  }, []);
  return (
    <html lang="en">
      <body  className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
