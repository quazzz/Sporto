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
    <div className="bg-gradient-to-b from-blue-950 flex justify-center items-center to-black w-full min-h-screen text-white p-8 sm:p-20 overflow-hidden">
    <div className="bg-gradient-to-b from-gray-950 to-blue-950 p-6 sm:p-10 w-full sm:w-3/4 lg:w-1/2 text-center rounded-2xl shadow-2xl border border-indigo-900 transition-all duration-500">
      <header className="text-center mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-4 sm:mb-6 mt-6 sm:mt-10 animate-fade-in">
          Workout to Another Level
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-white max-w-2xl mx-auto opacity-90 animate-fade-in delay-100">
          Discover AI-powered tools to manage your workouts, track your progress, and achieve your fitness goals—all in one place.
        </p>
      </header>
  
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 sm:mb-24 animate-fade-in delay-200">
        <Link href="/register">
          <p className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-sm sm:text-lg rounded-full shadow-lg hover:scale-105 transition-transform hover:shadow-indigo-500/50">
            Get Started
          </p>
        </Link>
        <Link href="/login">
          <p className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-indigo-700 text-sm sm:text-lg rounded-full shadow-lg hover:bg-gray-200 hover:scale-105 transition-transform hover:shadow-white/50">
            Log In
          </p>
        </Link>
      </div>
  
      <section className="max-w-4xl mx-auto animate-fade-in delay-300">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-gradient-to-b from-gray-900 to-black p-4 sm:p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-indigo-500/30">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Best Workout Management</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Create your gym workouts using our catalog and keep track of them effortlessly.
            </p>
          </div>
          <div className="bg-gradient-to-b from-gray-900 to-black p-4 sm:p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-indigo-500/30">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">AI-Powered Workouts</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Get personalized workout suggestions tailored to your fitness goals.
            </p>
          </div>
          <div className="bg-gradient-to-b from-gray-900 to-black p-4 sm:p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-indigo-500/30">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Progress Tracking</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Track your achievements and see how far youve come with detailed analytics.
            </p>
          </div>
        </div>
      </section>
  
      <section className="max-w-4xl mx-auto mt-16 sm:mt-24 animate-fade-in delay-400">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full rounded-lg shadow-lg bg-gradient-to-b from-gray-900 to-black border border-gray-800"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm sm:text-lg font-semibold text-gray-300 hover:text-indigo-400 transition px-4 sm:px-6 py-3 sm:py-4">
              How do I start?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-700">
              Create a group, add exercises from our extensive catalog, and start tracking your achievements today!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm sm:text-lg font-semibold text-gray-300 hover:text-indigo-400 transition px-4 sm:px-6 py-3 sm:py-4">
              What features are available?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400 text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-700">
              Manage workouts with AI-powered suggestions, track progress, and share achievements with a supportive community.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
  
      <footer className="text-center text-white mt-16 sm:mt-24 text-xs sm:text-sm opacity-80 animate-fade-in delay-500">
        <p>&copy; {new Date().getFullYear()} Sporto. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-4 sm:space-x-6">
          <Link href="/contact" className="hover:text-indigo-400 transition-colors">
            Contact Us
          </Link>
        </div>
      </footer>
    </div>
  </div>
  );
}
