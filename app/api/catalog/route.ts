
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import getUserId from "@/lib/getUserIdFromRequest";
import { group } from "console";
import { connect } from "http2";
const jsonRes = (data: unknown, status: number = 200) =>
  NextResponse.json(data, { status });
export async function GET() {
  const url = "https://exercisedb.p.rapidapi.com/exercises?limit=5000";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      return jsonRes({ error: "Failed to fetch exercises" }, response.status);
    }
    const data = await response.json();
    return jsonRes(data);
  } catch (error) {
    console.error("GET error:", error);
    return jsonRes({ error: "Internal server error" }, 500);
  }
 
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = await getUserId()
  
    delete body.id;
 
    if (Object.values(body).some((value) => !value)) {
      return jsonRes({ error: "Some properties are missing" }, 400);
    }
   
  
    const { groupId, ...exerciseData } = body;
   
    const data = {
      ...exerciseData,
      user: {
        connect: { id: userId }  
      },
      group: {
        connect: { id: groupId }
      }
    };
    
    await prisma.exercise.create({ data });
    return jsonRes({ message: "Exercise created successfully" });
  } catch (error) {
    console.error("POST error:", error);
    return jsonRes({ error: "Internal server error" }, 500);
  }
}
