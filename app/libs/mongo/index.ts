import { Db, MongoClient } from "mongodb";

const URL = process.env.DATABASE_URL;
const options = {};

if (!URL)
  throw new Error(
    "Please define the MONGODB_URI and MONGODB_DB environment variables"
  );

  let cachedClient: MongoClient | null = null;
  let cachedDb: Db | null | undefined = undefined;
  let client = new MongoClient(URL, options)

  export async function connectToDatabase() {
    try {
      if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
      }
      await client.connect();
      const db = client.db("test");
  
      cachedClient = client;
      cachedDb = db;
  
      return { client, db };
    } catch (error) {
      console.log(error);
    }
  }

  export async function disconnectFromDatabase() {
    await client.close();
  }