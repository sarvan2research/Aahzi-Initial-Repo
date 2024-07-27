import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    console.log("GET in userRankID");
    return new NextResponse("Method not allowed", { status: 405 });
  }
  try {
    const body = await req?.json();
    const { userID } = body;
    console.log(userID);

    const users = await prisma.guestRankUser.findUnique({
      where: {
        id: userID,
      },
    });  
    if (!users) {
      
      return NextResponse.json({ error: 'No matching results found, issue related to form submission.Please re-submit rank form' });
    }
    const colleges = await prisma.rank.findMany({
      select:{
        collegeCode:true,
        collegeName:true,
      },
      where: {
        collegeName: users!.collegeName,
        rankDetailsList: {
          some: {
            courseName: users!.course,
            [users!.community]: {
              gte: users!.rank,
            },
          },
        },
      },
    });

if(!colleges){
  return NextResponse.json({ error: 'As per your entered college, course and rank details requested college is might not be available as per our analysis.' });
}

    console.log("colleges :>> ", colleges);
    return NextResponse.json(colleges);
  } catch (error) {
    console.log(error);
  }
  finally {
    await prisma.$disconnect();
  }
}
