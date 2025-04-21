import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
export default async function getUserId(){
    const session = await getServerSession(authOptions);
    if(!session || !session.user || !session.user.id) return false;
    return session.user.id;
}