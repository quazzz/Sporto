import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const bodyPartsMappingForAI = [
  "back",
  "cardio",
  "chest",
  "arms",
  "neck",
  "shoulders",
  "legs",
  "waist",
];

const targetList = [
  "abductors",
  "abs",
  "adductors",
  "biceps",
  "calves",
  "cardiovascular system",
  "delts",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "levator scapulae",
  "pectorals",
  "quads",
  "serratus anterior",
  "spine",
  "traps",
  "triceps",
  "upper back",
];

async function analyzeIntent(message) {
  const messages = [
    {
      role: "system",
      content:
        "You are a helpful assistant. Extract the user's intent and provide structured output as JSON.",
    },
    {
      role: "user",
      content: `Determine the user's intent based on this message. If the user wants to make a group with exercises, set the intent as "group_ex". Add the user's message and the predicted muscle group from ${bodyPartsMappingForAI}. If it's just a group, set the intent as "group" and add the group name. If the user is asking about sports or other topics, set the intent as "chat" and add a message for the user.\n${message}`,
    },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    console.error("OpenAI API request failed:", response.status, response.statusText);
    throw new Error("Failed to analyze intent");
  }

  const data = await response.json();
  try {
    const parsedContent = JSON.parse(data.choices[0]?.message?.content || "{}");
    return parsedContent;
  } catch (error) {
    console.error("Failed to parse OpenAI response content:", data.choices[0]?.message?.content);
    throw new Error("Invalid JSON in OpenAI response");
  }
}

import { shuffle } from 'lodash'; // Use Lodash for shuffling (install with `npm install lodash`)

async function createGroupWithExercises(userId, groupName, muscleGroup) {
  try {
    if (!process.env.RAPIDAPI_KEY) {
      throw new Error("RAPIDAPI_KEY is missing in environment variables.");
    }

    const groupTitle = groupName || `Workout Group - ${muscleGroup}`;
    const group = await prisma.group.create({
      data: {
        name: groupTitle,
        userId: userId,
      },
    });

    console.log(`Group created: ${group.name} (ID: ${group.id})`);

    const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${muscleGroup}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch exercises: ${response.statusText}`);
    }

    const exercises = await response.json();

    // Shuffle and pick a subset of exercises (e.g., 10 random exercises)
    const randomExercises = shuffle(exercises).slice(0, 10);

    const exerciseData = randomExercises.map((exercise) => ({
      name: exercise.name,
      gifUrl: exercise.gifUrl,
      target: exercise.target,
      equipment: exercise.equipment,
      bodyPart: exercise.bodyPart,
      instructions: exercise.instructions || [],
      secondaryMuscles: exercise.secondaryMuscles || [],
      reps: "10-12",
      sets: "3",
      kg: "10-15",
      groupId: group.id,
    }));

    await prisma.exercise.createMany({
      data: exerciseData,
    });

    console.log(`${exerciseData.length} exercises added to group: ${group.name}`);
    return {
      message: `Group "${groupTitle}" with ${exerciseData.length} exercises created successfully!`,
    };
  } catch (error) {
    console.error("Error creating group with exercises:", error);
    throw new Error("Failed to create group with exercises. Please try again.");
  }
}


export async function POST(req) {
  if (!process.env.OPENAI_API_KEY || !process.env.RAPIDAPI_KEY) {
    return NextResponse.json(
      { error: "API keys are not set in the environment variables" },
      { status: 500 }
    );
  }

  try {
    const { messages, id } = await req.json();
    const userMessage = messages[messages.length - 1].content;

    console.log("Received user message:", userMessage);

    const intent = await analyzeIntent(userMessage);
    console.log("Detected intent:", intent);

    if (intent.intent === "group") {
      const groupName = intent.group_name || "Unnamed Group";
      const message = intent.message;
      console.log("Creating group:", groupName);

      const group = await prisma.group.create({
        data: {
          name: groupName,
          userId: id,
        },
      });

      if (!group.id) {
        throw new Error("Failed to create group");
      }

      return NextResponse.json({ message: message });
    } else if (intent.intent === "chat") {
      const message = intent.message;
      return NextResponse.json({ message: message });
    } else if (intent.intent === "group_ex") {
      const groupName = intent.group_name;
      const muscleGroup = intent.muscle_group;

      try {
        const result = await createGroupWithExercises(id, groupName, muscleGroup);
        return NextResponse.json({ message: result.message });
      } catch (error) {
        console.error("Error in group_ex intent handling:", error);
        return NextResponse.json(
          { error: error.message || "Failed to create group with exercises." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      message: "No valid action detected from the user's message.",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
