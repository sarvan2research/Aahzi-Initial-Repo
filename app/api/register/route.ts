import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import CustomRouter from "../hooks/useRouter";
import { fetchCutOffData } from "../controller/database";

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

    const userData = {
      id: user.id,
      mobileNumber: user.mobileNumber,
      course: user.course,
      community: user.community,
      cutoffMarks: user.cutoffMarks,
    };

    const response = await fetchCutOffData();
    console.log(response?.json());

    const cutoff_Data = await response?.json();
    const filteringColleges = cutoff_Data.filter(
      (data: { cutoffDetailsList: any[] }) =>
        data.cutoffDetailsList.some((courses) => {
          if (true) {
            for (const key of courses) {
              if (courses[key] == userData.cutoffMarks) {
                const communityMark = courses[key];
                courses?.courseCode === userData.course &&
                  communityMark <= userData.cutoffMarks;
                return true;
              }
            }
          }
        })
    );

    console.log(filteringColleges);

    const router = CustomRouter();
    router.push("/data");

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json("Prisma Database Connection", error);
  } finally {
    prisma.$disconnect();
  }
}
