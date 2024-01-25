import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  if (req.method != "GET") {
    console.log("GET");
  }

  if (req.method == "GET") {
    try {
      const colleges = await prisma.cutoff.findMany();
      return NextResponse.json(colleges);
    } catch (error) {
      console.log(error);
    }
  }
}
