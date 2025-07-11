
import { NextResponse } from "next/server";
import { JsonRes } from "@/app/actions/actions";
import getSession from "@/lib/getSession";
import { prisma } from "@/lib/prisma";
import getUserId from "@/lib/getUserIdFromRequest";
export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!(await getSession(req, userId))) {
      return JsonRes("error", "Access denied", 401);
    }
    const { recordName, achievement } = await req.json();
    if (!userId || !recordName || !achievement) {
      return JsonRes("message", "All fields must be filled", 400);
    }
    const newRecord = await prisma.record.create({
      data: {
        userId: userId,
        recordName: recordName,
        achievement: achievement,
      },
    });
    return new NextResponse(JSON.stringify(newRecord), {
      status: 200,
    });
  } catch (error) {
    console.log(error)
    if (process.env.NODE_ENV == "development") {
      return NextResponse.json(error, { status: 500 });
    }
    return JsonRes("message", "Internal server error", 500);
  }
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") ?? undefined;
  if (!(await getSession(req, userId))) {
    return JsonRes("error", "Access denied", 401);
  }
  const records = await prisma.record.findMany({
    where: {
      userId
    },
  });
  return NextResponse.json(records);
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const recordId = searchParams.get("recordId") ?? undefined;
    const userId = await getUserId();
    console.log(userId)
    const record = await prisma.record.findFirst({
      where: {
        id: recordId,
        userId: userId
      }
    })
    if(!record){
      return JsonRes('Error','No record or unauthorized', 401)
    }
    if(!userId){
      return JsonRes('Error','Invalid user', 400)
    }
    await prisma.record.delete({
      where: {
        id: recordId,
        userId: userId
      },
    });
    return JsonRes("message", `All good`, 200);
  } catch (error) {
    if (process.env.NODE_ENV == "development") {
      return NextResponse.json(error, { status: 500 });
    }
    return JsonRes("message", "Internal server error", 500);
  }
}
