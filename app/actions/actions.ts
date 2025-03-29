import { NextResponse } from "next/server";
export async function CreateUser(email: string, password: string, name: string){
    const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });
    return response
}
export async function JsonRes(type: string,message: string, code: number){
    if(type == 'error'){
        return NextResponse.json({error: message},{status: code})
    }
    return NextResponse.json({type: message}, {status: code})
}