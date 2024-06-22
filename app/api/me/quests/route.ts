import { prisma } from "@/lib/prisma";
import keyBy from "lodash/keyBy";

export const revalidate = 1;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (!id) {
    return Response.json({
      questTasks: {},
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      questTasks: true,
    },
  });

  return Response.json(keyBy(user?.questTasks || [], "questId"));
}
