import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (!id) {
    return Response.json({
      rank: null,
    });
  }

  const data = await prisma.user.findMany({
    select: {
      id: true,
      xp: true,
      quests: true,
      username: true,
    },
    orderBy: {
      xp: "desc",
    },
  });

  const foundIndex = (data?.findIndex((item) => item.id === id) ?? 0) + 1;

  return Response.json({
    rank: foundIndex ?? Infinity,
    ...(data ?? {}),
  });
}
