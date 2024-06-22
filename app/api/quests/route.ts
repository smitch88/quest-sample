import { getQuests } from "@/app/api/quests/drip";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export async function GET(request: Request) {
  const quests = await getQuests();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let isEligible = false;

  // Check user information and onboarding state
  if (id) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        xProfile: true,
        discordProfile: true,
      },
    });

    isEligible =
      Boolean(user?.xProfile?.xId) && Boolean(user?.discordProfile?.discordId);
  }

  return Response.json({
    quests: quests?.filter(({ data }) => !data.isExpired) || [],
    isEligible,
  });
}
