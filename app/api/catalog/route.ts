import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";
interface ExerciseRequest {
  name: string;
  equipment: string;
  gifUrl: string;
  target: string;
  bodyPart: string;
  instructions: string[];
  secondaryMuscles: string[];
  groupId: string;
  sets: string;
  reps: string;
  kg: string;
}



export async function GET() {
  // preparing for fetch, adding options and url
  const url = "https://exercisedb.p.rapidapi.com/exercises?limit=1000";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY ?? '',
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    },
  };
  try {
    // fetching exercisesDB API
    const response = await fetch(url, options);
    // getting json from response
    const data = await response.json();
    // returning that json to client-side
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // if error occures then we console it
    console.log(error);
  }
}
export async function POST(req: Request){
  const body: ExerciseRequest = await req.json()
  const { name, equipment, gifUrl, target, bodyPart, instructions, secondaryMuscles, groupId, sets, reps, kg } = body;
  if(!name || !equipment || !gifUrl || !target || !bodyPart || !instructions || !secondaryMuscles || !groupId || !sets || !reps || !kg){
    return new NextResponse(JSON.stringify({ error: "Some of properties are missing." }), { status: 401 });
  }
  await prisma.exercise.create({
    data: {
      name: name,
      equipment: equipment,
      gifUrl: gifUrl,
      target: target,
      bodyPart: bodyPart,
      instructions: instructions,
      secondaryMuscles: secondaryMuscles,
      groupId: groupId,
      sets: sets,
      reps: reps,
      kg: kg
    }
  })
  return new NextResponse(JSON.stringify({ message: "All ok" }), { status: 200 });

}