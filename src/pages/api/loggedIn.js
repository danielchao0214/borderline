import { jwtVerify } from "jose";

export default async function handler(req, res) {
  const token = req.cookies.token;
  const secret = new TextEncoder().encode("secret");

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const { payload, header } = await jwtVerify(token, secret);
    console.log("verified!");
    return res.status(200).json({ success: true, message: "Token verified" });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token verification failed" });
  }
}
