import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authoptions } from "../api/auth/[...nextauth]/route";
export default async function page() {
  const session = await getServerSession(authoptions)
  if(!session) redirect('/')
  return (
    <div className="min-h-screen text-gray-900 flex items-center justify-center py-12 bg-custom-lines font-[family-name:var(--font-geist-sans)]">
      
    </div>
  )
}
