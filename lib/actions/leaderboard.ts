"use server";

import { prisma } from "@/lib/prisma";

export const getLeaderboard = async ({ limit }) => {
  const data = await prisma.user.findMany({
    select: {
      id: true,
      xp: true,
      credentials: true,
      username: true,
      quests: true,
      imageUrl: true,
    },
    orderBy: {
      xp: "desc",
    },
    take: Number(limit),
  });

  return data?.map(({ id, xp, username, badges, quests, imageUrl }) => ({
    id,
    xp,
    username,
    badges,
    quests,
    imageUrl,
  }));
};
