import { connectToDatabase } from "@/app/libs/mongo";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.method == "GET") {
    try {
      const database = await connectToDatabase();
      if(database){
        const { db } = database;
        const guestUser_collection =  db.collection("GuestUser");
        return NextResponse.json(guestUser_collection);
      }
    } catch (error) {
      console.log(error);
    }
  } 
}
