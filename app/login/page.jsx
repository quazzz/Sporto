import React from "react";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route.js";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
   <div className="h-screen w-full flex flex-col lg:flex-row relative">
     <div className="hidden lg:flex lg:w-1/2 items-center justify-center animated-bg relative">
   
      
   
       <h1 className="text-6xl md:text-7xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
         Sporto. Stronger. Smarter
       </h1>
     </div>
   
   
     <div className="w-full lg:w-1/2 flex items-center justify-center animated-bg">
       <LoginForm />
     </div>
   </div>
  );
}
