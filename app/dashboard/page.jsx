import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import GroupForm from "../../components/GroupForm";
export default async function page() {
  const session = await getServerSession(authOptions)
  if(!session) redirect('/')
  return (
    <div className="min-h-screen text-gray-900 flex items-center justify-center py-12 bg-custom-lines font-[family-name:var(--font-geist-sans)]">
      <GroupForm/>
    </div>
  )
}
