import React from "react";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route.js";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <div className="h-screen w-full flex flex-col lg:flex-row items-center justify-center bg-gradient-to-b from-blue-950 to-black">
    
      <div className="flex-1 flex items-center justify-center p-6 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
