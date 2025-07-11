
import { NextResponse } from "next/server";
import { JsonRes } from "@/app/actions/actions";
import {prisma} from "@/lib/prisma";
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const groupId = searchParams.get("groupId");
    if (!groupId) {
      return JsonRes("message", "missing groupid", 400);
    }
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      select: { name: true },
    });
    if (!group) {
      return JsonRes("message", "group not found", 494);
    }
    const exercises = await prisma.exercise.findMany({
      where: { groupId },
    });

    return NextResponse.json(
      { groupName: group.name, exercises },
      { status: 200 }
    );
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json(
        { message: "Internal server error", error: error.message },
        { status: 500 }
      );
    }
    return JsonRes("message", "Internal Server Error", 500);
  }
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const exerciseId = searchParams.get("exerciseId");
    if (!exerciseId) {
      return NextResponse.json(
        { message: "Missing exerciseId" },
        { status: 400 }
      );
    }
    await prisma.exercise.delete({
      where: { id: exerciseId },
    });
    return JsonRes("message", "Exercise deleted succesfully", 200);
  } catch (error: any) {
    if (error.code === "P2025") {
      return JsonRes("message", "Exercise not found", 404);
    }
    if (process.env.NODE_ENV == "development") {
      return NextResponse.json(
        { message: "Internal server error", error: error.message },
        { status: 500 }
      );
    }
    return JsonRes("message", "Internal server error", 500);
  } 
}
export async function PUT(req: Request){
  try {
    // getting exercise id
    const {searchParams}= new URL(req.url)
    const exerciseId = searchParams?.get('exerciseId')
    if(!exerciseId){
      return JsonRes('message','No exercise id.', 400)
    }
    // getting json
    const data = await req.json();
    const {state, value} = data
    if(!state || !value || value === undefined){
      return JsonRes('message', 'Some fields are missing', 400);
    }
    // validating field
    const allowedFields = ['sets','weight','reps']
    if(!allowedFields.includes(state)){
      return JsonRes('message','Invalid field',400)
    }
    // updating the exercise
    await prisma.exercise.update({
      where: {
        id: exerciseId 
      },
      data: {
        [state]: value
      }
    })

    // returning 200
    return JsonRes('message', 'Exercise props updated', 200)
  } catch (error) {
      return JsonRes('error','Internal server error', 500)
  }
}