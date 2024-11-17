import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
  const { groupName, workoutDate, userId } = await req.json();

  if (!groupName || !workoutDate || !userId) {
    return new NextResponse(JSON.stringify({ error: "No id or date" }), { status: 401 });
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
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  console.log(userId);

  if (!userId) {
    return new NextResponse("No session", { status: 401 });
  }

  try {
    const workouts = await prisma.submittedWorkouts.findMany({
      where: {
        userId: userId,
      },
    });

    console.log(workouts);
    const dates = workouts.map((workout) => workout.workoutDate);
    console.log(dates)
    return new NextResponse(JSON.stringify({ dates }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error occurred", { status: 500 });
  }
}
