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
            { role: 'system', content: "You are a helpful assistant in a workout management app. Only respond with helpful, non-technical information and never provide detailed explanations about the data or schemas. Your job is to assist users with workout plans, exercises, and tracking their progress." },
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
