import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  // getting name and id from request
  const { namer, id }: { namer: string; id: string } = await req.json();

  // if we don't have them, return an error
  if (!namer || !id) {
    return new Response(
      JSON.stringify({ message: "All fields must be filled" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // creating new group in db via prisma
    const newGroup = await prisma.group.create({
      data: {
        name: namer,
        userId: id,
      },
    });

    // return the created group, including its id
    return new Response(JSON.stringify(newGroup), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating group:", error);
    return new Response(JSON.stringify({ message: "Error creating group" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req: Request) {
  // get params from url
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") ?? undefined;
  // if theres no param then return an error because user dont have authorization
  if (!userId) {
    return new Response(JSON.stringify({ message: "No auth" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    // firstly we try to find all groups in db via prisma by userid property
    const groups = await prisma.group.findMany({
      where: {
        userId: userId,
      },
    });
    // all ok so we return code 200
    return NextResponse.json(groups);
  } catch (err) {
    // if error occuring then console that
    console.error(err);
  }
}
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const groupId = searchParams.get("id");
  if (!groupId) {
    return new Response(JSON.stringify({ message: "No such group" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await prisma.exercise.deleteMany({
      where: { groupId: groupId },
    });

    await prisma.group.delete({
      where: {
        id: groupId,
      },
    });

    return new Response(
      JSON.stringify({ message: "Group and exercises deleted successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error deleting group or exercises" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const groupid = searchParams.get("id");
  const { name }: { name: string } = await req.json();
  if (!groupid) {
    return new Response(JSON.stringify({ message: "Something is missing" }), {
      status: 520,
      headers: { "Content-Type": "application/json" },
    });
  }
  await prisma.group.update({
    where: {
      id: groupid,
    },
    data: {
      name: name,
    },
  });
  return new Response(JSON.stringify({ message: "Group succesfuly updated" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
