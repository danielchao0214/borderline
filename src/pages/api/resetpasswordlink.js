import runCors from "./cors";
import { promisify } from "util";
import { randomBytes } from "crypto";
import clientPromise from "../../../lib/mongo";
import { transporter, mailOptions } from "../../../config/nodemailer";

const generateToken = promisify(randomBytes);

export default async function handler(req, res) {
  await runCors(req, res);

  const client = await clientPromise;
  const db = client.db("Users");

  if (req.method == "POST") {
    const email = req.body;
    if (!email) {
      return res.status(400).json({ message: "Bad request" });
    }

    // Check if the email exists in the Users collection
    const user = await db.collection("Users").findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    }
    const token = (await generateToken(32)).toString("hex");
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5);

    let url = process.env.BASE_URL + "/resetpassword/" + token;

    try {
      // Update the user object with the token and expiration time
      await db
        .collection("Users")
        .updateOne(
          { email },
          { $set: { resetToken: token, resetTokenExpiration: expirationTime } }
        );

      await transporter.sendMail({
        from: "cse416borderline@gmail.com",
        to: email,
        subject: "Reset Borderline Password",
        text: `Reset Link: ${url}`,
        html: `<h1>Reset Link</h1><p>${url}</p>`,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }

  return res.status(400).json({ message: "Bad request" });
}
