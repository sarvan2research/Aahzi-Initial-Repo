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

    const users = await prisma.guestRankUser.findUnique({
      where: {
        id: userID,
      },
    });  
    if (!users) {
      
      return NextResponse.json({ error: 'No matching results found, issue related to form submission.Please re-submit rank form' });
    }

    const courseExists = await prisma.rank.findMany({
      select:{
        collegeCode:true,
        collegeName:true,
      },
      where: {
        collegeName: users!.collegeName,
        rankDetailsList: {
          some: {
            courseName: users!.course,
          },
        },
      },
    });

    if(!(courseExists.length>0)){
      //console.log("courseExist :>> ", courseExists);
      const courseError={courseExists,"error":"No Matching Colleges"}
      return NextResponse.json(courseError)
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

    //console.log("colleges exists :>> ", colleges);
    const collegeExists={colleges,"error":""}
    return NextResponse.json(collegeExists);
  } catch (error) {
    console.log(error);
  }
  finally {
    await prisma.$disconnect();
  }
}
