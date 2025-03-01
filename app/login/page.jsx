import React from "react";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route.js";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  
  return (
    <div className="h-screen bg-gradient-to-b from-black to-blue-950 w-full flex flex-col lg:flex-row relative">
  
  <div className="lg:w-[70%] w-full flex items-center justify-center p-6">
    <h1 className="text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400 tracking-wider">
      Sporto. Faster. Better.
    </h1>
  </div>


  

  <div className="lg:w-[30%] w-full bg-black/5 backdrop-blur-sm flex items-center justify-center p-6">
    <div className="w-full max-w-md">
      <LoginForm />
    </div>
  </div>
</div>

  );
}