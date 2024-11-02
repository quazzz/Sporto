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
export async function DELETE(req){
    const {id} = await req.json()
    if(!id){
        return new NextResponse('Id is missing',{
            status: 400,
            headers: {
                'Content-Type' : 'application/json'
            }
        })
    }
    const deleteExercise = await prisma.exercise.delete({
        where: {
            id: id
        }
    })
    if(!deleteExercise){
        return new NextResponse(JSON.stringify(exercises),{
            status: 400,
            headers: {
                'Content-Type' : 'application/json'
            }
        })
    }
    return new NextResponse('All ok',{
        status: 200,
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}