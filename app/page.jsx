import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route.js";
import { Dumbbell, Brain, LineChart, Activity, ChevronRight, Star, Users, CheckCircle } from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0 opacity-70"></div>
      <div className="absolute inset-0 z-0 opacity-10"></div>
      <div className="absolute -top-1/4 -right-1/4 w-full h-full bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 bg-purple-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      <div className="relative z-10">

        <main className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center mt-10">
          <div className="space-y-8">
            <div>
              <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold bg-blue-900/40 text-blue-400 rounded-full border border-blue-800/40">
                AI-Powered Fitness
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400 leading-tight">
                Transform Your Workouts with AI
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-fade-in">
                Experience a new era of fitness with AI-driven coaching, intelligent progress tracking, and personalized training plans tailored to your goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="px-6 py-4 bg-blue-700 text-white rounded-lg font-medium shadow-lg hover:bg-blue-600 hover:shadow-xl active:bg-blue-800 active:scale-95 transition-all duration-200 text-center flex items-center justify-center gap-2"
              >
                <span>Start Your Journey</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="#features"
                className="px-6 py-4 bg-gray-900/70 text-white rounded-lg font-medium border border-blue-800/30 hover:bg-gray-800/70 transition-all duration-200 text-center"
              >
                Explore Features
              </Link>
            </div>
            
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-blue-600/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="bg-gray-900/50 backdrop-blur-lg p-3 rounded-2xl border border-blue-800/40 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-blue-700/20 hover:shadow-lg relative">
              <Image
                src="/lib/images/landing-page-intro.png"
                alt="AI Fitness Platform Preview"
                width={600}
                height={500}
                className="object-contain rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
    
            </div>
          </div>
        </main>

        
        <section id="features" className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
              Supercharge Your Workout Journey
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with proven workout exercises to help you achieve your goals faster.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Dumbbell className="w-8 h-8 text-blue-500" />,
                title: "Smart Workout Management",
                desc: "Create and customize workouts tailored to your specific fitness goals and preferences.",
              },
              {
                icon: <Brain className="w-8 h-8 text-blue-500" />,
                title: "AI Personal Coach",
                desc: "Get personalized training recommendations and real-time feedback on your form.",
              },
              {
                icon: <LineChart className="w-8 h-8 text-blue-500" />,
                title: "Progress Tracking",
                desc: "Visualize your performance with detailed analytics and achievement metrics.",
              },
            
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900/80 p-6 rounded-xl border border-blue-800/30 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 flex flex-col h-full"
              >
                <div className="bg-blue-900/30 p-3 rounded-lg inline-flex mb-4 border border-blue-800/30">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm flex-grow">{feature.desc}</p>

              </div>
            ))}
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-6 py-24 bg-gradient-to-b from-transparent to-blue-950/10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
              How Sporto Works
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Getting started is simple. Follow these steps to begin your fitness transformation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Account",
                desc: "You can register via email or Google",
              },
              {
                step: "02",
                title: "Choose Your Workouts",
                desc: "Create workout groups or ask an AI to do it and then add exercises to it from Our catalog.",
              },
              {
                step: "03",
                title: "Track & Improve",
                desc: "Log your workouts, analyze your progress, and watch as your result grow.",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-900/80 p-6 rounded-xl border border-blue-800/30 h-full">
                  <div className="text-4xl font-bold text-blue-700/30 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2 text-blue-800/30 z-10">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>


       
        <section className="max-w-3xl mx-auto px-6 py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "How do I get started with Sporto?",
                a: "Simply sign up to create your account, complete your fitness profile, and you'll be guided through setting up your first workout plan. You can create workout groups and add exercises from our extensive catalog right away!",
              },
              {
                q: "How does the AI coaching feature work?",
                a: "Our AI coach analyzes your workout data, progress, and goals to provide personalized recommendations. It helps identify areas for improvement, suggests workout modifications.",
              },
              {
                q: "Can I track my performance over time?",
                a: "Absolutely! Detailed analytics are available for every workout. You can view progress charts, performance metrics, and achievement milestones to see how you're improving over time.",
              },
              {
                q: "Is Sporto suitable for beginners?",
                a: "Yes! Sporto is designed for all fitness levels. For beginners, the AI provides simpler workout plans and more guidance. As you progress, your workouts will adapt to keep challenging you appropriately.",
              },
              {
                q: "Can I use Sporto with my existing fitness equipment?",
                a: "Yes, Sporto is flexible and can work with any equipment you have available. You can filter exercises based on your available equipment, or discover bodyweight alternatives when needed.",
              },
            ].map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-900/80 rounded-lg border border-blue-800/30"
              >
                <AccordionTrigger className="px-6 py-4 text-lg hover:text-blue-400 transition text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-400">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>


        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-12 text-center relative overflow-hidden border border-blue-800/30">
            <div className="absolute inset-0 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Transform Your Fitness Journey?
              </h2>

              <Link
                href="/register"
                className="px-8 py-4 bg-blue-700 text-white rounded-lg font-medium shadow-lg hover:bg-blue-600 hover:shadow-xl active:bg-blue-800 active:scale-95 transition-all duration-200 text-lg inline-flex items-center gap-2"
              >
                <span>Start Your Journey</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
              <p className="mt-4 text-sm text-gray-400">Completely free</p>
            </div>
          </div>
        </section>


        <footer className="relative z-10 bg-black/80 backdrop-blur-lg py-16 text-center ">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid  gap-12 mb-12 content-center">
              <div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400 mb-6">
                  Sporto
                </h3>
                <p className="text-gray-400">
                  AI-powered fitness platform to help you achieve your health and wellness goals.
                </p>
              </div>
            </div>   
            <div className="pt-8 border-t text-center border-gray-800 flex flex-col md:flex-row justify-center items-center gap-4">
              <p className="text-gray-500">
                &copy; {new Date().getFullYear()} Sporto. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}