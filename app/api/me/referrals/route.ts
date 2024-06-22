import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (!id) {
    return Response.json({
      referred: [],
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      referred: true,
    },
  });

  return Response.json({
    referralCount: user?.referred?.length || 0,
  });
}
