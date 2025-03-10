import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { shuffle } from "lodash";
import getSession from "../../../lib/getSession";
const prisma = new PrismaClient();

const BODY_PARTS = {
  back: "back",
  cardio: "cardio",
  chest: "chest",
  "lower arms": "lower arms",
  neck: "neck",
  "lower legs": "lower legs",
  "upper legs": "upper legs",
  shoulders: "shoulders",
  legs: "legs",
  waist: "waist",
  "upper arms": "upper arms",
};

const MUSCLE_TARGETS = {
  abductors: "abductors",
  abs: "abs",
  adductors: "adductors",
  biceps: "biceps",
  calves: "calves",
  "cardiovascular system": "cardiovascular system",
  delts: "delts",
  forearms: "forearms",
  glutes: "glutes",
  hamstrings: "hamstrings",
  "levator scapulae": "levator scapulae",
  quads: "quads",
  "serratus anterior": "serratus anterior",
  traps: "traps",
  triceps: "triceps",
  lats: "lats",
};

function getRandomLegsVariation(muscleGroup) {
  if (muscleGroup.toLowerCase() === "legs") {
    return Math.random() > 0.5 ? "upper legs" : "lower legs";
  }
  return muscleGroup;
}

function validateApiSetup() {
  if (!process.env.OPENAI_API_KEY || !process.env.RAPIDAPI_KEY) {
    throw new Error("Required API keys are not configured");
  }
}

async function analyzeUserIntent(message) {
  const systemPrompt = {
    role: "system",
    content:
      "You are a helpful assistant. Extract the user's intent and provide structured output as JSON.",
  };

  const userPrompt = {
    role: "user",
    content: `Analyze the following message and determine the user's intent. Return a JSON object with:
    - "intent": Either "group_ex" (for exercise group creation), "group" (for empty group creation), or "chat" (for general questions)
    - "group_name": Name of the group if specified
    - "muscle_group": Target muscle or body part if specified
    - "api": Either "bodyPart" (if muscle_group has exactly the same name as in ${Object.keys(
      BODY_PARTS
    ).join(", ")}) or "target" (if muscle_group has exactly the same name as in ${Object.keys(
      MUSCLE_TARGETS
    ).join(", ")})
    - "message": Response message for chat intent

    Message: ${message}`,
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [systemPrompt, userPrompt],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const parsedIntent = JSON.parse(data.choices[0]?.message?.content || "{}");

    if (!parsedIntent.intent) {
      throw new Error("Invalid intent format received from OpenAI");
    }

    return parsedIntent;
  } catch (error) {
    console.error("Intent analysis error:", error);
    throw new Error("Failed to analyze message intent");
  }
}

async function fetchExercises(muscleGroup, api) {
  try {
    const response = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/${api}/${muscleGroup}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Exercise API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Exercise fetch error:", error);
    throw new Error("Failed to fetch exercises");
  }
}

async function createGroupWithExercises(userId, groupName, muscleGroup, api) {
  try {
    const group = await prisma.group.create({
      data: {
        name: groupName || `Workout Group - ${muscleGroup}`,
        userId: userId,
      },
    });

    const exercises = await fetchExercises(muscleGroup, api);
    const selectedExercises = shuffle(exercises).slice(0, 5);

    const exerciseData = selectedExercises.map((exercise) => ({
      name: exercise.name,
      gifUrl: exercise.gifUrl,
      target: exercise.target,
      equipment: exercise.equipment,
      bodyPart: exercise.bodyPart,
      instructions: exercise.instructions || [],
      secondaryMuscles: exercise.secondaryMuscles || [],
      reps: "Unnamed",
      sets: "Unnamed",
      kg: "Unnamed",
      groupId: group.id,
    }));

    await prisma.exercise.createMany({
      data: exerciseData,
    });

    return {
      success: true,
      message: `Group "${group.name}" created with ${exerciseData.length} exercises! Please reload the page ;)`,
    };
  } catch (error) {
    console.error("Group creation error:", error);
    throw new Error("Failed to create exercise group");
  }
}

export async function POST(req) {
  try {
    validateApiSetup();

    const { messages, id } = await req.json();
    if(!(await getSession(req,id))){
      return new NextResponse(JSON.stringify('Access Denied'),{status:401})
    }
    if (!id || !messages?.length) {
      return NextResponse.json(
        { error: "Invalid request: missing user ID or messages" },
        { status: 400 }
      );
    }

    const userMessage = messages[messages.length - 1].content;
    const intent = await analyzeUserIntent(userMessage);

    switch (intent.intent) {
      case "group": {
        await prisma.group.create({
          data: {
            name: intent.group_name || "Unnamed Group",
            userId: id,
          },
        });
        return NextResponse.json({
          message: intent.message,
          bool: true,
        });
      }

      case "group_ex": {
        const muscleGroup = getRandomLegsVariation(intent.muscle_group);
        const result = await createGroupWithExercises(
          id,
          intent.group_name,
          muscleGroup,
          intent.api === "bodypart" ? "bodyPart" : intent.api
        );
        return NextResponse.json({
          message: result.message,
          bool: true,
        });
      }

      case "chat": {
        return NextResponse.json({
          message: intent.message,
        });
      }

      default: {
        return NextResponse.json({
          message: "Could not determine appropriate action from message.",
        });
      }
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
