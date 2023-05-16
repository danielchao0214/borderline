import { jwtVerify } from "jose";

export default async function handler(req, res) {
  const { token } = req.cookies;
  const secret = new TextEncoder().encode("secret");

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const { userId } = payload; // Assuming the user ID is stored in the 'userId' property

    console.log("verified!");

    return res
      .status(200)
      .json({ success: true, message: "Token verified", userId });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Token verification failed" });
  }
}
