import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs';
interface College{
  collegeCode:string
  collegeName:string
}

const filePath = path.join(process.cwd(), 'config', 'CollegeName_Code_2023.json');
export async function GET(req: Request) {
  if (req.method !== "GET") {
    return new NextResponse("Method not allowed", { status: 405 });
  }
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const colleges:College[] = JSON.parse(fileContents);
    return NextResponse.json(colleges);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses',message:error });
  }
}
