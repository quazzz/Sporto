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
    <div className="bg-gradient-to-b  from-blue-950 to-black w-full flex flex-col items-center justify-between min-h-screen text-white p-8 sm:p-20 h-screen overflow-hidden">
      <main className="flex flex-col items-center text-center max-w-3xl mt-16">
        <div className="grid grid-cols-4 gap-4 w-full mb-10">
          <div className="col-span-4 row-span-1 flex flex-col items-center justify-center">
            <h1 className="text-7xl font-bold text-white drop-shadow-lg">
              Workout to another level
            </h1>
            <p className="text-xl text-white max-w-xl mt-4">
              Discover AI-powered tools to manage your workouts and track your
              progress, all in one place.
            </p>
          </div>
        </div>

        <div className="flex space-x-6 mb-12">
          <Link href="/register">
            <p className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-lg rounded-full shadow-lg hover:scale-105 transition-transform">
              Get Started
            </p>
          </Link>
          <Link href="/login">
            <p className="px-8 py-4 bg-white text-indigo-700 text-lg rounded-full shadow-lg hover:bg-gray-200 hover:scale-105 transition-transform">
              Log In
            </p>
          </Link>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-2xl rounded-lg shadow-lg p-6 bg-gradient-to-b from-gray-900 to-black"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold text-gray-300 hover:text-indigo-400 transition">
              How do I start?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 mt-2 border-t border-gray-700 pt-2">
              Create a group, add exercises from our extensive catalog, and
              start tracking your achievements today!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold text-gray-300 hover:text-indigo-400 transition">
              What features are available?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 mt-2 border-t border-gray-700 pt-2">
              Manage workouts with AI-powered suggestions, track progress, and
              share achievements with a supportive community.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>

      <footer className="text-center text-white mt-20 text-sm opacity-80">
        <p>&copy; {new Date().getFullYear()} Sporto. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-6">
          <Link href="/contact">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
}
