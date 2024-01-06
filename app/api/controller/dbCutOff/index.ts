import { NextResponse } from "next/server";
import { fetchCutOffData } from "../database";

export async function GET(req:Request) {
  if(req.method == 'GET'){
    try {
      const response = await fetchCutOffData();
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  else return;
}

