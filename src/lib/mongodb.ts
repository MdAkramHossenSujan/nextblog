import { MongoClient, ServerApiVersion, Collection, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("❌ Please define MONGODB_URI in .env.local");
}

// Create a MongoClient instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export async function connectDb(collectionName: string): Promise<Collection> {
  try {
    // Always connect (MongoClient.connect() is safe to call multiple times)
    await client.connect();
    console.log("✅ MongoDB connected");

    const db: Db = client.db("blog");
    return db.collection(collectionName);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
}





