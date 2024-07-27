import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return new NextResponse("Method not allowed", { status: 405 });
  }
  try {
    const colleges = await prisma.rank.findMany({
      select: {
        collegeCode:true,
        collegeName:true,
      },
    });
    return NextResponse.json(colleges);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch colleges' });
  }
  finally {
    await prisma.$disconnect();
  }
}
