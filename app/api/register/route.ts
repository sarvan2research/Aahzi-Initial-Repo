import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const { name, mobileNumber, course, community, cutoffMarks } = body;

    const user = await prisma.guestUser.create({
      data: {
        name,
        mobileNumber,
        course,
        community,
        cutoffMarks,
      },
    });   

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json("Prisma Database Connection", error);
  } finally {
    prisma.$disconnect();
  }
}

// export async function getServerSideProps() {
//   const collegeList: GuestUser[] = await prisma.guestUser.findMany();
//   return {
//     props: {
//       CollegeListProps: collegeList,
//     },
//   };
// }
