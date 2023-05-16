import runCors from "./middleware";
import clientPromise from "../../../lib/mongo";
const bcrypt = require("bcryptjs");

export default async function handler(req, res) {
  // Run the middleware
  await runCors(req, res);

  if (req.method === "POST") {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      console.log("no token or password");
      return res.status(400).json({ message: "Bad request" });
    }

    try {
      const client = await clientPromise;
      const db = client.db("Users");

      // Check if the token exists and is valid
      const user = await db.collection("Users").findOne({ resetToken: token });
      console.log(user);
      if (!user) {
        return res.status(400).json({ message: "Invalid token" });
      }
      if (user.resetTokenExpires < Date.now()) {
        return res.status(400).json({ message: "Expired token" });
      }
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(newPassword, salt);
      // Update the user's password
      await db.collection("Users").updateOne(
        { resetToken: token },
        {
          $set: {
            passwordHash: passwordHash,
            resetToken: null,
            resetTokenExpires: null,
          },
        }
      );
      console.log("4");
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error resetting password:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  return res.status(400).json({ message: "Bad request" });
}
