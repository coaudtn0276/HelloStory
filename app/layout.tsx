import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const metadata: Metadata = {
  title: "Hello Stroy",
  description: "Hello Stroy",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko" className="flex justify-center">
      <body className="w-8/12 min-w-[400px]">
        <NavBar session={session} />
        {children}
      </body>
    </html>
  );
}
