import runCors from './cors';
import clientPromise from '../../../lib/mongo';
import { ObjectId } from 'mongodb';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
export default async function handler(req, res) {
    // Run the middleware
    await runCors(req, res)

    const { method, query } = req;
    console.log("Method", method, query);

    // Rest of the API logic
    const client = await clientPromise;
    const db = client.db("Forum");

    console.log(req.body);
    switch (req.method) {
        case "POST":

            const { id, commentTextField, author } = req.body;

            if (!id || !commentTextField || !author) {
                console.log("ERROR: Please enter all required fields.")
                return res
                    .status(400)
                    .json({ errorMessage: "ERROR: Please enter all required fields." });
            }

            var o_id = new ObjectId(id)
            //POST INFO TO DATABASE
            db.collection("Forum").updateOne({ _id: o_id }, { $push: { comments: { author: author, body: commentTextField, _id: new ObjectId() } } })

            return res.json({ status: 200, message: "SUCCESS: Post has been created and added to the DB" });

            break;
        case "GET":
            //
            break;
    }
}