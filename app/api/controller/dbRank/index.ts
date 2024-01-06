import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

async function serverToDBConnection() {
  try {
    const client = new MongoClient("DATBASE_URL");
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("test");
    const rank_collection = database.collection("Rank");
    try {
      const rank_data = await rank_collection.find({}).toArray();
      return NextResponse.json(rank_data);
    } catch (error) {
      console.error(error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } catch (error) {
    console.log(error);
  }
}

serverToDBConnection();
