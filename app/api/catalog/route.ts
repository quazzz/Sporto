import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";
import ExerciseRequest from "@/types/ExerciseReq";

const jsonRes = (data: unknown, status: number = 200) =>
  new NextResponse(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function GET() {
  // preparing for fetch, adding options and url
  const url = "https://exercisedb.p.rapidapi.com/exercises?limit=1000";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY ?? "",
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    },
  };
  try {
    // fetching exercisesDB API
    const response = await fetch(url, options);
    // getting json from response
    const data = await response.json();
    // returning that json to client-side
    return jsonRes(data);
  } catch (error) {
    // if error occures then we console it
    console.log(error);
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    delete body.id
    if (Object.values(body).some((value) => !value)) {
      return jsonRes({ error: "Some properties are missing" }, 400);
    }
    await prisma.exercise.create({
      data: body,
    });
    return jsonRes({ message: "All ok" });
  } catch (error) {
    return jsonRes({ error: "Server error" }, 500);
  }
}
