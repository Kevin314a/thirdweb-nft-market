import { connectToDB } from "@/lib/db";
import { InsertOneResult } from "mongodb";

export async function insertDocument(
  collectionName: string,
  document: any,
): Promise<InsertOneResult<Document>> {

  try {
    const db = await connectToDB();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document);
    return result;

  } catch (err) {
    console.error("[ERROR ON INSERT ONE TO DOCUMENT]", err);
    throw new Error("[ERROR ON INSERT ONE TO DOCUMENT]");
  }
}

export async function updateDocument(
  collectionName: string,
  filter: { [key: string]: any },
  data: { [key: string]: any },
): Promise<Boolean> {

  try {
    const db = await connectToDB();
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(filter, data);
    return !!result.upsertedId;

  } catch (err) {
    console.error("[ERROR ON UPDATE ONE OF DOCUMENT]", err);
    throw new Error("[ERROR ON UPDATE ONE OF DOCUMENT]");
  }
}
