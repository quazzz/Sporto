import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { JsonRes } from "@/app/actions/actions";
const prisma = new PrismaClient();
function isValidEmail(email: string) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}
function validate(name: string, email: string, password: string) {
  if (!name.trim() || !email.trim() || !password.trim()) {
    return "All fields are required";
  }
  if (!isValidEmail(email)) {
    return "Invalid email format";
  }
  return null;
}
export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = await req.json();
    const validation = validate(name, email, password);
    if (validation) {
      return JsonRes('error',validation, 400);
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return JsonRes('error',"Email is already in use", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        password: hashedPassword,
      },
    });
    return JsonRes('message',"User registered", 200);
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error creating user:", error);
    } else {
      console.error(
        "Error creating user:",
        error instanceof Error ? error.message : error
      );
    }
    return JsonRes('error',"Internal server error", 500);
  } finally {
    await prisma.$disconnect();
  }
}