import jwt from "jsonwebtoken";
import { DYNAMIC_PUBLIC_KEY } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { nanoid } from "nanoid";
import { toSqlDatetime } from "@/lib/formatting";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersList = headers();
    const authorization = headersList.get("authorization");

    const { referralById } = body;

    const verified = jwt.verify(
      authorization?.replace("Bearer ", ""),
      DYNAMIC_PUBLIC_KEY
    );

    if (!verified?.sub) {
      throw new Error("Invalid verification found");
    }

    const {
      sub,
      email,
      verified_credentials: credentials,
      username,
      first_visit: firstVisit,
      last_visit: lastVisit,
      scope,
    } = verified;

    await prisma.user.upsert({
      where: { id: sub },
      create: {
        id: sub,
        email,
        username,
        credentials,
        firstVisit,
        lastVisit,
        referralId: `${nanoid(8)}`.toUpperCase(),
      },
      update: {
        email,
        username,
        credentials,
        lastVisit: lastVisit,
      },
    });

    const loadedUser = await prisma.user.findUnique({
      where: { id: sub },
      include: {
        referredBy: true,
      },
    });

    const hasReferral = loadedUser?.referredBy;

    // Add Referral
    let referredByUsername;

    if (
      !hasReferral &&
      referralById &&
      loadedUser?.referralId !== referralById
    ) {
      const referralUser = await prisma.user.findUnique({
        where: { referralId: referralById },
      });

      if (referralUser?.id) {
        referredByUsername = referralUser.username;

        await prisma.referral.create({
          data: {
            referredById: referralUser.id,
            referralId: referralById,
            referredId: sub,
          },
        });

        try {
          await prisma.auditLog.create({
            data: {
              event: "CONNECT",
              name: "referral",
              description: `User ${referredByUsername} referred ${username}`,
              context: {
                referredByUsername,
                username,
              },
              userId: sub,
              createdAt: toSqlDatetime(new Date()),
            },
          });
        } catch (e) {
          // Ignore
          console.log(e);
        }
      }
    }

    return Response.json({
      user: {
        ...loadedUser,
        scope: scope ?? "user",
      },
      success: true,
      referredBy: referredByUsername,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 403 });
  }
}
