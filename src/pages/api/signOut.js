import { serialize } from "cookie";


export default function handler(req, res) {
  if (req.method === "GET") {
    // Set token in cookie with max age 1 millisecond
    const cookie = serialize("token", "", {
      maxAge: 1,
      httpOnly: true,
      path: "/",
    });

    res.setHeader("Set-Cookie", cookie);

    // Send a success response
    res.status(200).json({ message: "Sign out successful" });
  } else {
    // If the request method is not POST, return an error response
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
