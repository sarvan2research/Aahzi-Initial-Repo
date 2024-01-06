import { NextResponse } from "next/server";
import { fetchUserData } from "../database";

export async function GET(req:Request) {
  if(req.method == 'GET'){
    try {
      const response = await fetchUserData();
      // console.log(response);
      return NextResponse.json(response);
    } catch (error) {
      console.log(error);
    }
  }
  else return;
}
