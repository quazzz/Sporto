import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
async function analyzeIntent(message) {
    const messages = [
        { role: "system", content: "You are a helpful assistant. Extract the user's intent and provide structured output." },
        { role: "user", content: `Determine the user's intent based on this message:\n${message}` },
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages,
            max_tokens: 100,
        }),
    });
    
    if (!response.ok) {
        throw new Error('Failed to analyze intent');
    }
    
    const data = await response.json();
    console.log("OpenAI API Response:", data); // Log the full response to see its structure
    
    // Check if the expected structure is present before trying to parse
    if (data.choices && data.choices[0] && data.choices[0].message) {
        return JSON.parse(data.choices[0].message.content); // Assuming `content` is the correct property
    } else {
        throw new Error('Invalid response format from OpenAI API');
    }
    
}

const bodyPartsMapping = {
    back: ["back", "спина", "трапеции", "поясница"],
    cardio: ["cardio", "кардио", "выносливость", "аэробика"],
    chest: ["chest", "грудь", "грудные мышцы"],
    "lower arms": ["lower arms", "предплечья", "руки ниже локтя", "кисть"],
    "lower legs": ["lower legs", "голень", "икры", "икроножные мышцы", "лодыжка"],
    neck: ["neck", "шея", "позвонки шеи"],
    shoulders: ["shoulders", "плечи", "дельтовидные мышцы"],
    "upper arms": ["upper arms", "верхние руки", "бицепс", "трицепс"],
    "upper legs": ["upper legs", "ноги", "верхние ноги", "бедра", "квадрицепс", "ягодицы"],
    waist: ["waist", "талия", "пресс", "живот", "косые мышцы живота"],
};


// Функция для определения группы мышц на основе пользовательского ввода
function detectBodyPart(userInput) {
    const lowerInput = userInput.toLowerCase();
    for (const [bodyPart, keywords] of Object.entries(bodyPartsMapping)) {
        if (keywords.some(keyword => lowerInput.includes(keyword))) {
            return bodyPart; // Возвращаем часть тела, соответствующую вводу
        }
    }
    return null; // Если ничего не найдено
}

// Функция для получения упражнений с учетом целевой группы мышц
async function fetchExercisesForMuscle(userInput) {
    const targetBodyPart = detectBodyPart(userInput);
    if (!targetBodyPart) {
        console.log("Could not detect body part:", userInput);
        throw new Error("Could not detect body part");
    }

    const url = "https://exercisedb.p.rapidapi.com/exercises";
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": process.env.RAPIDAPI_KEY,
            "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        },
    };

    const response = await fetch(url, options);
    if (!response.ok) {
        console.log("Failed to fetch exercises from API");
        throw new Error("Failed to fetch exercises");
    }

    const exercises = await response.json();
    return exercises.filter(ex => ex.bodyPart.toLowerCase() === targetBodyPart);
}

export async function POST(req) {
   
    try {
        const { messages, id } = await req.json();
        const userMessage = messages[messages.length - 1].content;

        console.log("Received user message:", userMessage);

        const intent = await analyzeIntent(userMessage);
        console.log("Detected intent:", intent);

        if (intent.action === "createGroup") {
            const groupName = intent.groupName || "Unnamed Group";
            const targetMuscle = intent.targetMuscle;

            console.log("Creating group:", groupName, "for muscle:", targetMuscle);
            
            const group = await prisma.group.create({
                data: {
                    name: groupName,
                    userId: id,
                },
            });

            if (!group.id) {
                throw new Error("Failed to create group");
            }

            console.log("Group created:", group);

            const exercises = await fetchExercisesForMuscle(targetMuscle);
            console.log("Fetched exercises:", exercises);

            for (const exercise of exercises) {
                console.log("Adding exercise to group:", exercise.name);
                await prisma.exercise.create({
                    data: {
                        name: exercise.name,
                        equipment: exercise.equipment || "None",
                        gifUrl: exercise.gifUrl || "",
                        target: exercise.target || "",
                        bodyPart: exercise.bodyPart,
                        instructions: exercise.instructions || [],
                        secondaryMuscles: exercise.secondaryMuscles || [],
                        groupId: group.id,
                        sets: '3',
                        reps: '10-12',
                        kg: '0',
                    },
                });
            }

            return NextResponse.json({ message: `Group "${groupName}" created with exercises for ${targetMuscle}` });
        }

        return NextResponse.json({ message: "No action performed." });
    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}
