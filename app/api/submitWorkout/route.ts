import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";
const prisma = new PrismaClient();
import getSession from "@/lib/getSession";
export async function POST(req: Request,res: Response) {
  const { groupName, workoutDate, userId } = await req.json();
  if (!(await getSession(req, userId))) {
    return new NextResponse(JSON.stringify("Access Denied"), { status: 401 });
  }
  if (!groupName || !workoutDate || !userId) {
    return new NextResponse(
      JSON.stringify({ error: "Some of properties are missing." }),
      { status: 401 }
    );
  }

  try {
    const newsubmitted = await prisma.submittedWorkouts.create({
      data: {
        groupName: groupName,
        workoutDate: workoutDate,
        userId: userId,
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "All good", newsubmitted }),
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
    return new NextResponse(
      JSON.stringify({ error: "An unknown error occurred" }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request,res:Response) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!(await getSession(req, userId))) {
    return new NextResponse(JSON.stringify("Access Denied"), { status: 401 });
  }

  if (!userId) {
    return new NextResponse("No session", { status: 401 });
  }

  try {
    const workouts = await prisma.submittedWorkouts.findMany({
      where: {
        userId: userId,
      },
    });

    const names = workouts.map((workout) => workout.groupName);
    const dates = workouts.map((workout) => workout.workoutDate);
    return new NextResponse(JSON.stringify({ dates, names }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error occurred", { status: 500 });
  }
}
