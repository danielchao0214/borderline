import { runCors } from "./middleware";
import clientPromise from "../../../lib/mongo";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { serialize } from "cookie";

const handler = async (req, res) => {
  await runCors(req, res);

  const { method, body } = req;
  console.log("Method", method);

  const client = await clientPromise;
  const db = client.db("Users");
  const { email, password } = body;
  console.log(body);

  try {
    if (method !== "POST") {
      throw new Error("Method Not Allowed");
    }

    if (!email || !password) {
      throw new Error("Please enter all required fields");
    }

    const existingUser = await db.collection("Users").findOne({ email });

    if (!existingUser) {
      throw new Error("Wrong Email or Password Provided");
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      throw new Error("Wrong Email or Password Provided");
    }

    // Generate JWT token
    const secret = new TextEncoder().encode("secret");
    const alg = "HS256";
    const token = await new SignJWT({ userId: existingUser._id })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

    // Set token in cookie
    const cookie = serialize("token", token, {
      httpOnly: true,
      path: "/",
    });

    res.setHeader("Set-Cookie", cookie);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: existingUser,
    });
  } catch (error) {
    console.log("ERROR:", error.message);
    return res.status(401).json({ errorMessage: error.message });
  }
};

export default handler;