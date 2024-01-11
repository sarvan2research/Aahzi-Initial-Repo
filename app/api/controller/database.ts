// import { Db, MongoClient } from "mongodb";
// import { NextResponse } from "next/server";
// const mongodbUrl: string | undefined = process.env.DATABASE_URL;

// if (!mongodbUrl) {
//   throw new Error(
//     "Please define the MONGODB_URI and MONGODB_DB environment variables"
//   );
// }

// let cachedClient: MongoClient | null = null;
// let cachedDb: Db | null | undefined = undefined;

// const client = new MongoClient(mongodbUrl as string);

// export async function connectToDatabase() {
//   try {
//     if (cachedClient && cachedDb) {
//       return { client: cachedClient, db: cachedDb };
//     }
//     await client.connect();
//     const db = client.db("test");

//     cachedClient = client;
//     cachedDb = db;

//     return { client, db };
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function disconnectFromDatabase() {
//   await client.close();
// }

// export async function fetchCutOffData() {
//   try {
//     const { db }: any = await connectToDatabase();
//     const cutOff_collection = await db.collection("CutOff");
//     const cutoff_data = await cutOff_collection.find().toArray();
//     return NextResponse.json(cutoff_data);
//     // res.status(200).json(cutoff_data);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     disconnectFromDatabase();
//   }
// }


