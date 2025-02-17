import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { groupName, workoutDate, userId } = await req.json();

  if (!groupName || !workoutDate || !userId) {
    return new NextResponse(JSON.stringify({ error: "Some of properties are missing." }), { status: 401 });
  }

  try {
    const newsubmitted = await prisma.submittedWorkouts.create({
      data: {
        groupName: groupName,
        workoutDate: workoutDate,
        userId: userId,
      },
    });
    return new NextResponse(JSON.stringify({ message: "All good", newsubmitted }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new NextResponse("No session", { status: 401 });
  }

  try {
    const workouts = await prisma.submittedWorkouts.findMany({
      where: {
        userId: userId,
      },
    });

    const names = workouts.map((workout) => workout.groupName)
    const dates = workouts.map((workout) => workout.workoutDate);
    return new NextResponse(JSON.stringify({ dates,names }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error occurred", { status: 500 });
  }
}
