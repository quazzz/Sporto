import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const groupId = searchParams.get("groupId");

    if (!groupId) {
      return NextResponse.json({ message: "Missing groupId" }, { status: 400 });
    }

    const group = await prisma.group.findUnique({
      where: { id: groupId },
      select: { name: true },
    });

    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    const exercises = await prisma.exercise.findMany({
      where: { groupId },
    });

    return NextResponse.json({ groupName: group.name, exercises }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const exerciseId = searchParams.get("exerciseId");

    if (!exerciseId) {
      return NextResponse.json({ message: "Missing exerciseId" }, { status: 400 });
    }

    await prisma.exercise.delete({
      where: { id: exerciseId },
    });

    return NextResponse.json({ message: "Exercise deleted successfully" }, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ message: "Exercise not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
