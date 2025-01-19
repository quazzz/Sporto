import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";
export async function GET() {
  // preparing for fetch, adding options and url
  const url = "https://exercisedb.p.rapidapi.com/exercises?limit=1000";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
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
export async function POST(req){
  const {name,equipment,gifUrl,target,bodyPart,instructions,secondaryMuscles,groupId,sets,reps,kg} = await req.json()
  const newex = await prisma.exercise.create({
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
  return new NextResponse('All good')

}