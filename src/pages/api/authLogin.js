import { runCors } from "./middleware";
import clientPromise from "../../../lib/mongo";
const bcrypt = require("bcryptjs");
import { SignJWT } from "jose";
const cookieParser = require("cookie-parser");
import { serialize } from "cookie";

export default async function handler(req, res) {
  // Run the middleware
  await runCors(req, res);

  const { method, query } = req;
  console.log("Method", method, query);

  // Rest of the API logic
  const client = await clientPromise;
  const db = client.db("Users");
  const { email, password, username } = req.body;
  switch (req.method) {
    case "POST":
      if (!email || !password) {
        console.log("ERROR: Please Enter in all required fields");
        return res
          .status(400)
          .json({ errorMessage: "ERROR: Please Enter in all required fields" });
      }

      const existingUser = await db
        .collection("Users")
        .findOne({ email: email });
      if (!existingUser) {
        console.log("ERROR: Wrong Email or Password Provided");
        return res.status(401).json({
          errorMessage: "ERROR: Wrong Email or Password Provided",
        });
      }

      const passwordCorrect = await bcrypt.compare(
        password,
        existingUser.passwordHash
      );
      if (!passwordCorrect) {
        console.log("ERROR: Wrong Email or Password Provided");
        return res.status(401).json({
          success: false,
          errorMessage: "ERROR: Wrong Email or Password Provided",
        });
      }

      // LOGIN THE USER
      if (passwordCorrect) {
        // Generate JWT token
        const secret = new TextEncoder().encode("secret");
        const alg = "HS256";
        const token = await new SignJWT({ "urn:example:claim": true })
          .setProtectedHeader({ alg })
          .setIssuedAt()
          .setExpirationTime("2h")
          .sign(secret);
        console.log(token);
        const cookie = serialize("token", token, {
          httpOnly: true,
          path: "/",
        });
        // Set token in cookie and return success response
        res.setHeader("Set-Cookie", cookie);
        return res.status(200).json({
          success: true,
          message: "User logged in successfully",
          user: existingUser,
        });
      }
  }
  //login success prompt
}
