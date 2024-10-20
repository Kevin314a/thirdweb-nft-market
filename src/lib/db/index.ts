import { MongoClient } from 'mongodb';

const dbName = process.env.DB_NAME;
const uri = process.env.MONGODB_URI as string;
let client: MongoClient | null = null;

export async function connectToDB() {
  try {

    if (!client) {
      client = new MongoClient(uri as string, {
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000,
        serverSelectionTimeoutMS: 30000,
      });
      await client.connect();
      console.log("[CONNECTED SUCCESSFULLY TO DATABASE]");
    }
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.error("[ERROR ON CONNECTING TO DATABASE]", err);
    throw new Error("[DB CONNECTION FAILED]");
  }
}

process.on('exit', async () => {
  if (client) {
    await client.close();
    console.log("[DATABASE CONNECTION CLOSED]");
  }
});
