import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route.js";
import { Dumbbell, Brain, LineChart, Activity } from "lucide-react";
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
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0 bg-gradient-animated opacity-70 animate-gradient"></div>
      <div className="bg-gradient-triangle"></div>
      <div className="absolute inset-0 z-0 bg-gradient-animated opacity-10 animate-gradient"></div>
      <div className="bg-gradient-triangle"></div>
      <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      <div className="relative z-10">
        <main className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center mt-20">
          <div>
            <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
              Your AI-powered Workout Management
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience a new era of fitness with AI-driven coaching, progress
              tracking, and personalized training plans.
            </p>
            <div className="flex space-x-4">
              <Link
                href={"/register"}
                className="px-6 py-3 w-1/2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Start Now
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gray-900/50 backdrop-blur-lg p-6 rounded-xl border border-blue-800/40 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: <Dumbbell className="w-8 h-8 text-blue-500" />,
                    title: "Workout Management",
                    desc: "Create workouts tailored to your needs.",
                  },
                  {
                    icon: <Brain className="w-8 h-8 text-blue-500" />,
                    title: "AI Coach",
                    desc: "Personalized training & real-time feedback.",
                  },
                  {
                    icon: <LineChart className="w-8 h-8 text-blue-500" />,
                    title: "Progress Insights",
                    desc: "Track performance with detailed analytics.",
                  },
                  {
                    icon: <Activity className="w-8 h-8 text-blue-500" />,
                    title: "Adaptive Training",
                    desc: "Modify plans based on your achievements.",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 p-4 rounded-lg flex flex-col items-start hover:scale-105 transition-transform"
                  >
                    <div className="mb-2">{feature.icon}</div>
                    <h3 className="text-sm font-bold mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
            Trusted by Athletes & Beginners Alike
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex G.",
                feedback: "The AI-driven coaching helped a lot!",
              },
              {
                name: "Fogell McLovin",
                feedback: "I love how intuitive the workout plans are!",
              },
              {
                name: "Steven Armstrong",
                feedback: "Best app for tracking progress hands down!",
              },
            ].map((review, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-lg p-6 rounded-xl border border-blue-800/30 hover:scale-105 transition-transform"
              >
                <p className="text-gray-400 mb-4">"{review.feedback}"</p>
                <p className="text-blue-400 font-semibold">{review.name}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="flex items-center justify-center mx-auto px-6 py-12  text-center ">
          <div className="max-w-2xl w-full">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400 mb-6 ">
              FAQs
            </h2>
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
          </div>
        </section>
        <footer className="relative z-10 bg-black/50 backdrop-blur-lg py-12 text-center">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Sporto
              </h3>
            </div>
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} Sporto. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
