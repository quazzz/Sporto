import React from "react";
import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Sparkles } from "lucide-react";
export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-blue-800  to-black text-white relative overflow-hidden px-6">
           <div className="absolute inset-0 pointer-events-none z-0">
             <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] bg-blue-500/25 rounded-full blur-[180px] animate-pulse"></div>
             <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[150px] animate-pulse"></div>
           </div>
           <div className="absolute inset-0 z-0 bg-gradient-animated opacity-70 animate-gradient"></div>
     
           
     
           <div className="flex flex-col items-center justify-center relative z-10 mt-10">
             <div className="w-full max-w-md p-5 rounded-3xl text-center bg-gradient-to-b from-gray-900 to-black shadow-2xl shadow-white/20">
               <Sparkles
                 size={40}
                 className="text-blue-400 animate-pulse mx-auto mb-4"
               />
               <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
                 Elevate
               </h1>
               <p className="text-white/80 mt-2 mb-6">
                 Unlock your full potential. Your journey from good to extraordinary
                 starts here.
               </p>
             </div>
             <RegisterForm />
           </div>
         </div>
    </>
  );
}
