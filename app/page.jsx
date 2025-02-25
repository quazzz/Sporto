import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route.js";
import { Dumbbell, Brain, LineChart, Activity, Users } from "lucide-react";
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
    <div className="bg-gradient-to-b from-black to-blue-950 min-h-screen text-white w-full">
      <section className="animate-fade-in relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(29,78,216,0.3),_transparent_60%)]" />
        <div className="grid md:grid-cols-2 gap-10 px-6 max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col justify-center text-center md:text-left">
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
              Your AI-powered Workout Management
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mt-6">
              Experience a new era of fitness with AI-driven coaching, progress
              tracking, and personalized training plans.
            </p>
            <div className=" z-10000 mt-8 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Link href="/register">
                <p className="px-8 py-4 bg-blue-700 rounded-lg text-lg font-semibold hover:bg-indigo-500 transition-all shadow-lg">
                  Get Started
                </p>
              </Link>
              <Link href="/login">
                <p className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-lg text-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
                  Sign In
                </p>
              </Link>
            </div>
          </div>

          <div className="absolute right-0 hidden sm:block top-1/2 transform -translate-y-1/2 w-[400px] h-[400px] opacity-40">
            <div className="blob absolute w-full h-full bg-gradient-to-b from-blue-500 to-blue-600 mix-blend-screen animate-blob"></div>
          </div>
        </div>
      </section>

      <section className="animate-fade-in max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          {
            icon: <Dumbbell />,
            title: "Workout Management",
            desc: "Create workouts tailored to your needs.",
          },
          {
            icon: <Brain />,
            title: "AI Coach",
            desc: "Personalized training & real-time feedback.",
          },
          {
            icon: <LineChart />,
            title: "Progress Insights",
            desc: "Track performance with detailed analytics.",
          },
          {
            icon: <Activity />,
            title: "Adaptive Training",
            desc: "Modify plans based on your achievements.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-br from-gray-900 to-blue-950 p-8 rounded-xl border border-blue-800/40 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute  opacity-25 bg-blue-500 rounded-xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 flex items-center justify-center bg-indigo-500/30 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-950 to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
            Trusted by Athletes & Beginners Alike
          </h2>
          <div className="mt-12 flex flex-col md:flex-row gap-8 justify-center">
            {[
              {
                name: "Alex G.",
                feedback:
                  "The AI-driven coaching helped a lot!",
              },
              {
                name: "Fogell McLovin.",
                feedback: "I love how intuitive the workout plans are!",
              },
              {
                name: "Steven Armstrong.",
                feedback: "Best app for tracking progress hands down!",
              },
            ].map((review, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-lg border border-indigo-900/30 shadow-lg transform hover:scale-105 transition"
              >
                <p className="text-gray-400">"{review.feedback}"</p>
                <p className="text-indigo-400 mt-4 font-semibold">
                  {review.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">FAQs</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {[
            {
              q: "How do I get started?",
              a: "Simply sign up and start your journey! Create a group and just add exercises from our catalog!",
            },
            {
              q: "How does AI coaching work?",
              a: "The AI adapts to your progress and helps you improve.",
            },
            {
              q: "Can I track my performance?",
              a: "Yes, detailed analytics are available for every workout.",
            },
          ].map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gray-900 rounded-lg border border-indigo-900/30"
            >
              <AccordionTrigger className="px-6 py-4 text-lg hover:text-indigo-400 transition">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-400">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <footer className=" py-12 text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Sporto. All rights reserved.
        </p>
        <Link
          href="/contact"
          className="text-gray-400 hover:text-indigo-400 transition"
        >
          Contact Us
        </Link>
      </footer>
    </div>
  );
}
