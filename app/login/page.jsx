import React from "react";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route.js";
export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <>
      <LoginForm />
    </>
  );
}
