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
    <div className="flex items-center justify-center min-h-screen bg-custom-lines p-8 sm:p-20 ">
      <main className="flex flex-col items-center gap-8 max-w-lg text-center">
        <h1 className="text-5xl font-bold ">
          Your complete platform for workouts
        </h1>
        
        <div className="mt-4">

       
        <ol className="text-lg space-y-4">
        <li>Sporto provides workout exercise management with AI integration.</li>

          <li >
            Start by{" "}
            <Link href="/register">
              <span className="p-2 bg-black text-white rounded-full hover:underline">
                registering
              </span>
            </Link>
          </li>
          <li className=" mt-4">or</li>
          <li>
            Logging in to existing{" "}
            <Link href="/login">
              <span className="p-2 bg-black text-white rounded-full hover:underline">
                account
              </span>
            </Link>
          </li>
        
        
        </ol>

         </div>
        <Accordion type="single" collapsible className="w-full max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I start?</AccordionTrigger>
            <AccordionContent>
              Try creating a new group and then start adding exercises to it from the catalog! Very easy.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What features are available?</AccordionTrigger>
            <AccordionContent>
              You can manage workouts with access to AI-powered suggestions tailored to your goals.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}
