import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

//route for POST method
export async function POST(req: Request) {
  try {
    // get info from request -> name,email,password
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = await req.json();
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "All fields must be fielded in" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    //check for email valid
    const emailcheck = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (emailcheck) {
      return new Response(
        JSON.stringify({ message: "Email is used by somebody" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // hash password for security
    const hashed: string = await bcrypt.hash(password, 10);
    // create new user in db
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashed,
      },
    });
    // if all ok then send response with status code 200
    return new Response(
      JSON.stringify({ message: "Data received successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    let errorMessage = "Error creating user";
  
    if (error instanceof Error) {
      errorMessage = error.message;
    }
  
    return new Response(
      JSON.stringify({ message: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  
}
