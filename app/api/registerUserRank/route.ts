import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request, res:Response) {
  if (req.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const { name, mobileNumber, course, community, collegeName,rank } = body;

    const userRankId = await prisma.guestRankUser.create({
      data: {
        name,
        mobileNumber,
        course,
        community,
        collegeName,
        rank,
      },
    });

    const userID = userRankId?.id;
    const encryptedUserID = btoa(userID);
    return NextResponse.json(encryptedUserID);
  } catch (error: any) {
    return NextResponse.json("Prisma Database Connection", error);
  } finally {
    prisma.$disconnect();
  }
}
