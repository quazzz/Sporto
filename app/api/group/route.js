import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req) {
  // getting name and id from request
  const { namer, id } = await req.json();
  // if we dont have them then return an error
  if (!namer || !id) {
    return new Response(
      JSON.stringify({ message: "All fields must be fullfilled" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  // creating new group in db via prisma
  const group = await prisma.group.create({
    data: {
      name: namer,
      userId: id,
    },
  });
  // all ok so we return code 200
  return new Response(JSON.stringify({ message: "All ok" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(req) {
  // get params from url
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
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
    return new Response(JSON.stringify(groups), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // if error occuring then console that
    console.error(err);
  }
}
export async function DELETE(req) {
  // get id from searchparams
  const { searchParams } = new URL(req.url);
  const groupId = searchParams.get("id");
  // if we dont have id we return error
  if (!groupId) {
    return new Response(JSON.stringify({ message: "No such group" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    // firstly we try to delete the group via prisma by id
    const group = await prisma.group.delete({
      where: {
        id: groupId,
      },
    });
    // all ok so we return code 200
    return new Response(
      JSON.stringify({ message: "Succesfuly deleted group" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // if error occures then consoling that
    console.error(error);
  }
}
