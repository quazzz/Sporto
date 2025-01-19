
import "./globals.css";
import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "./Providers";
import { Toaster } from "react-hot-toast";
import LoadingPage from "../app/loading";
import { Raleway } from 'next/font/google'
import Chat from '@/components/Chat'
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
const raleway = Raleway({subsets: ['latin']})
export const metadata = {
  title: "Sporto",
  description: "Sporto application",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <Suspense fallback={<LoadingPage />}>
        <body
          className={`${raleway.className}`}
        >
          <Toaster position="bottom-center" />
          <AuthProvider>
            <Navbar/>
            <div className="min-h-screen text-gray-900 flex items-center justify-center py-12  font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-gray-900 to-black">
            {children}
            {session &&  <Chat/>}
          
            </div>
          </AuthProvider>
        </body>
      </Suspense>
    </html>
  );
}