import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { DYNAMIC_PUBLIC_KEY, X_CONNECT } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import {
  completeQuest,
  getQuestById,
  getQuestCompletionStatus,
  normalizeQuests,
} from "@/app/api/quests/drip";
import { first } from "lodash";
import { toSqlDatetime } from "@/lib/formatting";

export const maxDuration = 30; // 30 seconds
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersList = headers();
    const authorization = headersList.get("authorization");

    const questId = body?.id;

    if (!questId) {
      return Response.json(
        {
          success: false,
          error: "Invalid questId provided",
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

    // Query drip for status
    const user = await prisma.user.findUnique({
      where: {
        id: verified.sub,
      },
      include: {
        xProfile: true,
        discordProfile: true,
      },
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          error: "Invalid user",
        },
        { status: 404 }
      );
    } else if (!user.xProfile?.xId) {
      return Response.json(
        {
          success: false,
          error: "Cannot verify status without valid twitter id",
        },
        { status: 422 }
      );
    }

    // Pull quest data by id
    const quest = await getQuestById(questId).then((quest) =>
      first(normalizeQuests([quest]))
    );

    if (!quest || quest.data?.isExpired) {
      return Response.json(
        {
          success: false,
          error: "Invalid quest by id",
        },
        { status: 404 }
      );
    }

    const userQuest = await prisma.userQuestTask.findUnique({
      where: {
        userId_questId: {
          userId: verified.sub,
          questId,
        },
      },
    });

    if (userQuest) {
      return Response.json(
        {
          success: false,
          error: `Already completed quest. Received ${userQuest?.reward} XP.`,
        },
        { status: 422 }
      );
    }

    const reward = quest.data?.xp;
    const status = await getQuestCompletionStatus(user.xProfile?.xId, questId);
    const isCompleted = status?.success;

    // Handle rewards
    if (isCompleted) {
      // Complete on drip side
      // const { success } = await completeQuest(
      //   user.discordProfile.discordId,
      //   questId
      // );
      //
      // if (!success) {
      //   throw new Error("Error fulfilling quest");
      // }

      await prisma.$transaction([
        prisma.userQuestTask.create({
          data: {
            userId: user.id,
            questId: questId,
            twitterId: user.xProfile.xId,
            reward,
          },
        }),
        prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            xp: {
              increment: reward,
            },
            quests: {
              increment: 1,
            },
          },
        }),
        prisma.auditLog.create({
          data: {
            event: "QUEST",
            name: "quest-claim",
            description: "User claimed reward for quest",
            context: {
              userId: user.id,
              questId: questId,
              twitterId: user.xProfile.xId,
              reward,
            },
            userId: user.id,
            createdAt: toSqlDatetime(new Date()),
          },
        }),
      ]);
    }

    return Response.json({
      success: true,
      quest,
      status: {
        state: status?.responses,
        isCompleted,
      },
    });
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
