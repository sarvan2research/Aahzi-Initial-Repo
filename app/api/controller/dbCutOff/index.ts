import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { disconnectFromDatabase } from "@/app/libs/mongo";

export default async function GET(req:NextApiRequest, res:NextApiResponse) {
  try {
    const client = new MongoClient("MONGODB_URL");
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("test");
    const cutOff_collection = database.collection("CutOff");
    const cutoff_data = await cutOff_collection.find().toArray();
    return NextResponse.json(cutoff_data);
  } catch (error) {
    console.log(error);
  }
  finally{
    disconnectFromDatabase();
  }
}

// export async function GET(req:Request,res:any) {
//   if(req.method == 'GET'){
//     try {
//       const response = await fetchCutOffData();
//       console.log(response);
//       res.status(200).json(response);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   else return;
// }

