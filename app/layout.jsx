import localFont from "next/font/local";
import "./globals.css";
import React, { Suspense } from "react";
import Navbar from '@/components/Navbar'
import { AuthProvider } from "./Providers";
import { Toaster } from 'react-hot-toast'
import LoadingPage from "../app/loading"
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Sporto",
  description: "Sporto application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Suspense fallback={<LoadingPage/>}>
     
        <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
