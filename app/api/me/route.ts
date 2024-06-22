import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { DYNAMIC_PUBLIC_KEY } from "@/lib/constants";
import { toSqlDatetime } from "@/lib/formatting";

export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json(null, { status: 422 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return Response.json(user);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersList = headers();
    const authorization = headersList.get("authorization");

    if (!body?.action) {
      return Response.json(
        {
          success: false,
          error: "Invalid action provided",
        },
        { status: 422 }
      );
    }

    const verified = jwt.verify(
      authorization?.replace("Bearer ", ""),
      DYNAMIC_PUBLIC_KEY
    );

    if (!verified?.sub) {
      throw new Error("Invalid verification found");
    }

    const { verified_credentials: credentials } = verified;

    throw new Error(`Unknown action attempted: ${body?.action}`);
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        error: "There was an unexpected server error. Please try again.",
      },
      { status: 500 }
    );
  }
}
