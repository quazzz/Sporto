import React from "react";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route.js";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className=" w-full bg-gradient-to-b from-black to-blue-950 flex flex-col lg:flex-row items-center justify-center  overflow-hidden">
      <div className="absolute hidden right-10 sm:block top-1/2 transform -translate-y-1/2 w-[500px] h-[500px] opacity-40">
        <div className="blob absolute w-full h-full bg-gradient-to-b from-blue-500 to-blue-600 mix-blend-screen animate-blob"></div>
      </div>
      <div className="lg:w-[70%] w-full flex items-center justify-center p-6"></div>
      <div className="lg:w-[30%] w-full bg-black/10 backdrop-blur-md flex flex-col items-center justify-center p-6  text-center">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
