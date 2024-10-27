import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()
export async function GET(req){
    const { searchParams } = new URL(req.url);
    const groupId = searchParams.get("groupId");
    const exercises = await prisma.exercise.findMany({
        where: {
            groupId: groupId
        }
    })
    return new NextResponse(JSON.stringify(exercises),{
        status: 200,
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}