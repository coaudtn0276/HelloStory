"use client";

import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SessionProvider } from "next-auth/react";

// export const metadata: Metadata = {
//   title: "Hello Stroy",
//   description: "Hello Stroy",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <html lang="ko" className="flex justify-center">
        <body className="w-8/12 min-w-[400px]">
          <NavBar />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
