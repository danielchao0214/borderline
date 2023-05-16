// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { method, query } = req;
  console.log("Method", method, query);

  switch (method) {
    case "GET": // Get Data
      res.status(200).json({ name: "John Doe" });
      break;

    case "POST": //POST DATA
      console.log(req.body);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
