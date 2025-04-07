
import { Sparkles } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if(session) redirect('/dashboard');
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-950 to-black text-white relative overflow-hidden px-6">

      <div className="absolute inset-0 pointer-events-none z-0">
 
        <div className="absolute -top-60 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-0"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTMwIDBhMzAgMzAgMCAxIDAgNjAgMCAzMCAzMCAwIDEgMC02MCAweiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTMwIDBWNjAiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjxwYXRoIGQ9Ik0wIDMwSDYwIiBzdHJva2U9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMikiIHN0cm9rZS13aWR0aD0iLjUiLz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center max-w-6xl w-full py-10">
 
        <div className="flex-1 w-full md:w-1/2 max-w-lg">
          <div className="p-6 md:p-8">
            <div className="flex items-center mb-6">
              <Sparkles size={32} className="text-blue-400 mr-3" />
              <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
                Sporto
              </h1>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Continue your journey
            </h2>
            
            <p className="text-blue-100/80 text-lg mb-6 max-w-md">
              Continue unlocking your full potential with our comprehensive workout platform designed to transform your workout quality and elevate your performance.
            </p>
            
            <div className="hidden md:flex space-x-6 mt-10">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-white">Faster Growth</h3>
                  <p className="text-sm text-blue-100/70">Accelerate your progress</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-white">Secure Platform</h3>
                  <p className="text-sm text-blue-100/70">Your data stays protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 max-w-md">     
            <LoginForm />
        </div>
      </div>
      
      
      

   
    </div>
  );
}