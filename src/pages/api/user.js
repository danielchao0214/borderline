import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongo";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("Users");

    let o_id = new ObjectId(id);
    
    // Retrieve user information from the database based on the provided ID
    const user = await db.collection("Users").findOne({ _id: o_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}