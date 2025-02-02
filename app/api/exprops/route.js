import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export async function POST(req){
    const {handler,val} = await req.json()
}