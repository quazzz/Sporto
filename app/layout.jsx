import "./globals.css";
import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "./Providers";
import { Toaster } from "react-hot-toast";
import LoadingPage from "../app/loading";
import { Raleway } from "next/font/google";
import Chat from "@/components/Chat";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
const raleway = Raleway({ subsets: ["latin"] });
export const metadata = {
  title: "Sporto",
  description: "Sporto application",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <Suspense fallback={<LoadingPage />}>
        <body className={`${raleway.className}`}>
          <Toaster
            position="bottom-center"
            toastOptions={{
              className: "",
              style: {
                padding: "16px",
                color: "white",
                backgroundImage: "linear-gradient(135deg, #172554, #0f172a)"
              },
            }}
          />
          <AuthProvider>
            <Navbar />
            <div className="bg-gradient-to-br from-blue-900 via-gray-950 to-black min-h-screen">{children}</div>

            {session && <Chat />}
          </AuthProvider>
        </body>
      </Suspense>
    </html>
  );
}
