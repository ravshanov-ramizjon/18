import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/castom/Header";

export const metadata: Metadata = {
  title: "FruitStore",
  description: "FruitStore - Your one-stop shop for fresh fruits",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
            {children}
        </main>
      </body>
    </html>
  );
}
