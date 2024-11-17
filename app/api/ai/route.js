import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
export async function POST(req) {
    try {
        const { messages,id } = await req.json();

       
        const groups = await prisma.group.findMany({
            where:{
                userId: id
            },
            include:{
                exercises: true
            }
        })
        const formattedMessages = [
            { role: 'system', content: "Hello dear ChatGPT! You're in my application, so you're like an assistant. Please act accordingly. This is workout management app, where you create groups, add exercises to it and start doing them, you can add your sport achievements and track the days you did workouts via calendar" },
            ...messages, 
            { role: 'system', content: `User groups: ${JSON.stringify(groups)}` }, 
        ];
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: formattedMessages
            }),
        });

 
        if (!response.ok) {
            throw new Error('Failed to fetch completion from OpenAI');
        }

     
        const data = await response.json();

    
        return NextResponse.json(data.choices[0].message);
        
    } catch (error) {
   
        return NextResponse.json(
            { error: 'Something went wrong',error },
            { status: 500 }
        );
       
    }
}
