
import "./globals.css";
import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "./Providers";
import { Toaster } from "react-hot-toast";
import LoadingPage from "../app/loading";
import { Raleway } from 'next/font/google'

const raleway = Raleway({subsets: ['latin']})
export const metadata = {
  title: "Sporto",
  description: "Sporto application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Suspense fallback={<LoadingPage />}>
        <body
          className={`${raleway.className}`}
        >
          <Toaster position="bottom-center" />
          <AuthProvider>
            <Navbar></Navbar>
            {children}
          </AuthProvider>
        </body>
      </Suspense>
    </html>
  );
}