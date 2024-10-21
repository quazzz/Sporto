import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import GroupPage from "@/components/GroupPage";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const userId = session?.user?.id;
  console.log(userId, "cookie rookie");
  return <GroupPage userId={userId} />;
}
