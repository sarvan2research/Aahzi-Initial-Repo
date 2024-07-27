import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs';

interface course{
  courseCode:string
  courseName:string
}

const filePath = path.join(process.cwd(), 'config', 'CourseName_Code_2023.json');
export async function GET(req: Request) {
  if (req.method !== "GET") {
    return new NextResponse("Method not allowed", { status: 405 });
  }
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const courses = JSON.parse(fileContents);
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses',message:error });
  }
}
