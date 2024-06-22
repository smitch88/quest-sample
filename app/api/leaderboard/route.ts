import { getLeaderboard } from "@/lib/actions/leaderboard";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || 10000;
  const data = await getLeaderboard({ limit });
  return Response.json(data);
}
