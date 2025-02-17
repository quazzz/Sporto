import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const { recordName, achievement } = await req.json();
  if(!userId || !recordName || !achievement){
    return new NextResponse('Name, achievement or userid is missing!',{
        status: 500
    })
  }
  const newRecord = await prisma.record.create({
    data: {
      userId: userId,
      recordName: recordName,
      achievement: achievement,
    },
  });
  return new NextResponse(JSON.stringify(newRecord),{
    status: 200
  })
  
}
export async function GET(req: Request){
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get('userId') ?? undefined
    const records = await prisma.record.findMany({
        where: {
            userId: userId
        }
    })
    return NextResponse.json(records)
}
export async function DELETE(req: Request){
    const {searchParams} = new URL(req.url)
    const recordId = searchParams.get('recordId') ?? undefined
    await prisma.record.delete({
        where: {
            id: recordId
        }
    })
    return new NextResponse('All ok',{
        status: 200
    })
}