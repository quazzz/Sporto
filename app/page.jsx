import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route.js";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="flex flex-col items-center justify-between min-h-screen  text-gray-900 p-8 sm:p-20 h-screen overflow-hidden">
      

      <main className="flex flex-col items-center text-center max-w-3xl mt-16">
        <h1 className="text-7xl font-bold text-black mb-6 drop-shadow-md">
          Elevate Your Workouts
        </h1>
        <p className="text-xl text-black mb-10">
          Discover AI-powered tools to manage your workouts and track your progress, all in one place.
        </p>

        <div className="flex space-x-6 mb-12">
          <Link href="/register">
            <p className="px-8 py-4 bg-black text-white text-lg rounded-full shadow-xl hover:bg-gray-800 transition">Get Started</p>
          </Link>
          <Link href="/login">
            <p className="px-8 py-4 bg-white text-black text-lg rounded-full shadow-xl hover:bg-gray-100 transition">Log In</p>
          </Link>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold text-gray-800">How do I start?</AccordionTrigger>
            <AccordionContent className="text-gray-700 mt-2">
              Create a group, add exercises from our extensive catalog, and start tracking your achievements today!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold text-gray-800">What features are available?</AccordionTrigger>
            <AccordionContent className="text-gray-700 mt-2">
              Manage workouts with AI-powered suggestions, track progress, and share achievements with a supportive community.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>

      <footer className="text-center text-white mt-20">
        <p>&copy; {new Date().getFullYear()} Sporto. All rights reserved.</p>
      </footer>
    </div>
  );
}