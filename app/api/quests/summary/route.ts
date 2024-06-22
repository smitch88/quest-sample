import { getQuests } from "@/app/api/quests/drip";

export const revalidate = 60;

export async function GET(request: Request) {
  const quests = await getQuests();
  return Response.json({
    activeTotal: quests.length,
  });
}
