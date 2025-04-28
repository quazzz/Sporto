import { NextResponse } from "next/server";
import getSession from "../../../lib/getSession";
import { prisma } from "@/lib/prisma";
import fs from 'fs';
import path from "path";
const fpath = path.join(process.cwd(), 'lib', '/exercises/exercises.json');
let history = []
const readf = (fpath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fpath, 'utf-8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const getUserData = async(userId) => {
  try {
    const groups = await prisma.group.findMany({
      where: {
        userId: userId
      }
    });
    const groupIds = groups.map(group => group.id)
    const exercises = await prisma.exercise.findMany({
      where: {
        groupId: {
          in: groupIds
        }
      }
    });
    const records = await prisma.record.findMany({
      where: {
        userId: userId
      }
    });
    return { groups, exercises, records };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { groups: [], exercises: [], records: [] };
  }
};

function validateApiSetup() {
  if (!process.env.OPENAI_API_KEY || !process.env.RAPIDAPI_KEY) {
    throw new Error("Missing API keys (OPENAI_API_KEY or RAPIDAPI_KEY)");
  }
}

async function analyzeUserIntent(message, userId) {
 
  try {
    const fileContent = await readf(fpath);
    const exerciseCatalog = JSON.parse(fileContent);
    
    const userData = await getUserData(userId);
    
    const systemPrompt = {
      role: "system",
      content: `You must help user by analyzing their workouts data or help user pick workout exercises from this catalog: ${JSON.stringify(exerciseCatalog)}`
    };
    
    const userPrompt = {
      role: "user",
      content: `THIS IS A PROMPT BY DEV: Help user with their needs using very easy language and short answers, heres chat history ${history}. Here's their data: ${JSON.stringify(userData)}. If there's no data, don't mention that to the user. Here's their message: ${message}`
    };
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [systemPrompt, userPrompt],
        max_tokens: 500,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }
  
    const data = await response.json();
    history.push(`User message ${userPrompt}, ChatGPT answer ${data.choices[0]?.message?.content || ''}`)
    return data.choices[0]?.message?.content || "Sorry, I couldn't process your request.";
  } catch (error) {
    console.error("Intent analysis error:", error);
    throw new Error("Failed to analyze message intent");
  }
}

export async function POST(req) {
  try {
    validateApiSetup();
    
    const { messages, id } = await req.json();
    
    if (!(await getSession(req, id))) {
      return new NextResponse(JSON.stringify({ error: "Access Denied" }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (!id || !messages?.length) {
      return NextResponse.json(
        { error: "Invalid request: missing user ID or messages" },
        { status: 400 }
      );
    }
    
    const userMessage = messages[messages.length - 1].content;
    const text = await analyzeUserIntent(userMessage, id);
    
    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}