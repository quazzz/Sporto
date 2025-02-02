import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const bodyPartsMappingForAI = [
  "back",
  "cardio",
  "chest",
  "lower arms",
  "neck",
  "lower_legs",
  "upper_legs",
  "shoulders",
  "legs",
  "waist",
  "upper arms"
];
const targets = [
  'abductors',
  'abs',
  'adductors',
  'biceps',
  'calves',
  'cardiovascular system',
  'delts',
  'forearms',
  'glutes',
  'hamstrings',
<<<<<<< HEAD
  
=======
>>>>>>> 44ae408 (fade in animations + ai relogic + main page fixes)
  'levator scapulae',
  'pectorals',
  'quads',
  'serratus anterior',

  'traps',
  'triceps',
  'lats'
]

function randomPrefix(bodyPart) {
  if (bodyPart === "legs") {
    return Math.random() > 0.5 ? "upper legs" : "lower legs";
  }
  return bodyPart;
}

async function analyzeIntent(message) {
  const messages = [
    {
      role: "system",
      content:
        "You are a helpful assistant. Extract the user's intent and provide structured output as JSON.",
    },
    {
      role: "user",
      content: `Determine the user's intent based on this message. If the user wants to make a group with exercises, set the intent as "group_ex". 
      Add the user's message and the predicted muscle group from bodyparts array ${bodyPartsMappingForAI} or target ${targets} as muscle_group, 
      add property named 'api' that will have one of values bodypart or target 
      so like if users wants something from bodypartlist ${bodyPartsMappingForAI} then the property 
      will be named 'bodyPart' and if from 
      target list ${targets} then just 'target' (so like if user wants pecs then the muscle_group is pectorals (as it named in the list) and api gonna be named "target" because pecs only exist in target list) but if user says legs or other that has prefix 
      in list ("lower" or "upper"), 
      so like if user wants some legs (in list it has prefix) then select the upper legs or lower legs
      If it's just a group, set the intent as 
      "group" and add the group name. If the user is asking questions about sports or other topics or some random shit, set the intent as "chat" and add a message for the user.\n${message}`,
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
    throw new Error("Invalid JSON in OpenAI response",error);
  }
}

import { shuffle } from 'lodash'; 

async function createGroupWithExercises(userId, groupName, muscleGroup,api) {
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

    const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/${api}/${muscleGroup}`, {
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

    const randomExercises = shuffle(exercises).slice(0, 5);

    const exerciseData = randomExercises.map((exercise) => ({
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
    if(!id || !messages){
      return NextResponse.json({error: 'Some of the properties are missing.'}, {status:401})
    }
  
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

      return NextResponse.json({ message: message, bool: true });
    } else if (intent.intent === "chat") {
      const message = intent.message;
      return NextResponse.json({ message: message });
    } else if (intent.intent === "group_ex") {
      const groupName = intent.group_name;
      let muscleGroup = intent.muscle_group;
      let api = intent.api
      if(api == 'bodypart'){
        api = 'bodyPart'
      }
      console.log(api)
      muscleGroup = randomPrefix(muscleGroup)

      try {
        const result = await createGroupWithExercises(id, groupName, muscleGroup,api);
        return NextResponse.json({ message: result.message,bool: true  });
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
