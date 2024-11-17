import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()
export async function GET(req){
    const { searchParams } = new URL(req.url);
    const groupId = searchParams.get("groupId");
    const group = await prisma.group.findFirst({
        where: {
            id: groupId
        }
    })
    const groupName = group.name
    const exercises = await prisma.exercise.findMany({
        where: {
            groupId: groupId
        }
    })
    const data = {groupName,exercises}
    return new NextResponse(JSON.stringify(data),{
        status: 200,
        headers: {
            'Content-Type' : 'application/json'
        }
    })
}
export async function DELETE(req){
    const { searchParams } = new URL(req.url)
    const exerciseId = searchParams.get('exerciseId')
    if(!exerciseId){
        return new NextResponse('Id is missing',{
            status: 400,
            headers: {
                'Content-Type' : 'application/json'
            }
        })
    }
    const deleteExercise = await prisma.exercise.delete({
        where: {
            id: exerciseId
        }
    })
    if(!deleteExercise){
        return new NextResponse(JSON.stringify('No exercise with that id'),{
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