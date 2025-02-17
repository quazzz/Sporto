import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route.js";
import { Activity, Dumbbell, LineChart, Brain } from "lucide-react";
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
    <div className="bg-gradient-to-b from-blue-950 to-black min-h-screen text-white mt-10">
    
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 to-black/80 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
              Transform Your Fitness Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              Harness the power of AI to revolutionize your workout routine and achieve your fitness goals faster than ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <p className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg text-lg font-semibold hover:from-indigo-500 hover:to-blue-500 transition-all shadow-xl hover:shadow-indigo-500/25">
                  Start Your Journey
                </p>
              </Link>
              <Link href="/login">
                <p className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg text-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
                  Sign In
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-indigo-900/30">
        <div className="bg-gradient-to-br from-gray-900 to-blue-950 p-6 rounded-xl border border-indigo-900/30 transition-transform hover:scale-105">
          <Dumbbell className="w-12 h-12 text-indigo-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Manage Your Workouts</h3>
          <p className="text-gray-400">Create workouts that fits in your style.</p>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-blue-950 p-6 rounded-xl border border-indigo-900/30 transition-transform hover:scale-105">
          <Brain className="w-12 h-12 text-indigo-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">AI Coach</h3>
          <p className="text-gray-400">Get real-time feedback and form corrections powered by AI.</p>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-blue-950 p-6 rounded-xl border border-indigo-900/30 transition-transform hover:scale-105">
          <LineChart className="w-12 h-12 text-indigo-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
          <p className="text-gray-400">Track your workout progress by viewing your analytics table.</p>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-blue-950 p-6 rounded-xl border border-indigo-900/30 transition-transform hover:scale-105">
          <Activity className="w-12 h-12 text-indigo-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Custom Plans</h3>
          <p className="text-gray-400">Create and modify workout plans that fit your schedule perfectly.</p>
        </div>
      </div>

   
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="bg-gray-900/50 rounded-lg border border-indigo-900/30">
            <AccordionTrigger className="px-6 py-4 text-lg hover:text-indigo-400">
              How do I get started?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-400">
              Simply sign up, create your workout group and then add exercises to it from our catalog!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="bg-gray-900/50 rounded-lg border border-indigo-900/30">
            <AccordionTrigger className="px-6 py-4 text-lg hover:text-indigo-400">
              How can I use AI?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-400">
              Our AI can create groups and specific bodypart exercises to it.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="bg-gray-900/50 rounded-lg border border-indigo-900/30">
            <AccordionTrigger className="px-6 py-4 text-lg hover:text-indigo-400">
              How do I start a workout?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-400">
              Simply when you achieve more than 2 exercises in a workout group an start button will appear.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>


      <footer className="border-t border-indigo-900/30 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Sporto. All rights reserved.</p>
            <div className="mt-4">
              <Link href="/contact" className="text-gray-400 hover:text-indigo-400 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}