import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
export default async function getSession(req,id) {
    const session = await getServerSession(authOptions); 
    if (!session) return false;
    const userid = session?.user?.id;
    return userid === id;
}