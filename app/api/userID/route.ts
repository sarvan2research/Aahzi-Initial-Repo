import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  if (req.method == "GET") {
    console.log("GET");
  }

  const conditions = [
    { cutOffBC: "" },
    { cutOffOC: "" },
    { cutOffBC: "" },
    { cutOffBCM: "" },
    { cutoffMBCDNC: "" },
    { cutoffMBCV: "" },
    { cutOffSC: "" },
    { cutOffST: "" },
    { cutOffMBC: "" },
    { cutOffSCA: "" },
  ];

  let incrementedCutOff = 0;
  let decrementedCutOff = 0;

  try {
    const body = await req?.json();
    const { userID } = body;
    console.log(userID);

    const users = await prisma.guestUser.findUnique({
      where: {
        id: userID,
      },
    });
    console.log(users);
    console.log(users!.cutoffMarks % 5);

    incrementedCutOff = users!.cutoffMarks + 2;
    decrementedCutOff = users!.cutoffMarks - 2;

    console.log(incrementedCutOff + " " + decrementedCutOff);

    console.log(users!.community);
    console.log(users!.course);
    const colleges = await prisma.cutoff.findMany({
      select:{
        collegeCode:true,
        collegeName:true,
      },
      where: {
        cutoffDetailsList: {
          some: {
            courseCode: users!.course,
            [users!.community]: {
              gte: decrementedCutOff,
              lte: incrementedCutOff,
            },
          },
        },
      },
      take:10
    });
    console.log("colleges :>> ", colleges);
    return NextResponse.json(colleges);
  } catch (error) {
    console.log(error);
  }
}
