import { PrismaClient } from "@prisma/client";
import { JsonRes } from "@/app/actions/actions";
import { NextResponse } from "next/server";
import getSession from "@/lib/getSession";
const prisma = new PrismaClient(); 
export async function POST(req: Request) {
  try {
    const { namer, id }: { namer: string; id: string } = await req.json();
    if (!namer || !id) {
      return JsonRes('message',"All fields must be filled", 400);
    }
    const newGroup = await prisma.group.create({
      data: { name: namer, userId: id },
    });
    return NextResponse.json(newGroup, { status: 201 });
  } catch (error) {
    console.error("Error creating group:", error);
    return JsonRes('message','Error creating group',500)
  }
}
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId || !(await getSession(req, userId))) {
      return JsonRes('error','Access denied',401)
    }
    const groups = await prisma.group.findMany({ where: { userId } });

    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    console.error("Error fetching groups:", error);
    return JsonRes('message','Error fetching groups',500)

  }
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const groupId = searchParams.get("id");

    if (!groupId) {
      return JsonRes('message','No such group',401)
    }
    await prisma.exercise.deleteMany({ where: { groupId } });
    await prisma.group.delete({ where: { id: groupId } });
  return JsonRes('message','Deletion succesfull',400)  } catch (error) {
    console.error("Error deleting group:", error);
    return JsonRes('message','Error deleting groups / exercises',500)
  }
}
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const groupId = searchParams.get("id");
    const { name }: { name: string } = await req.json();
    if (!groupId || !name) {
         return JsonRes('message','Missing fields',400)
    }
    await prisma.group.update({
      where: { id: groupId },
      data: { name },
    });
    return JsonRes('message','Group updated',200)
  } catch (error) {
    console.error("Error updating group:", error);
    return JsonRes('message','Error updating group',500)
  }
}