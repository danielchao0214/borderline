import runCors from './cors';
import clientPromise from '../../../lib/mongo';
import { ObjectId } from 'mongodb';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
export default async function handler(req, res) {
    // Run the middleware
    await runCors(req, res)

    // Rest of the API logic
    const client = await clientPromise;
    const db = client.db("Maps");
    switch (req.method) {
        case "POST":
            console.log(req.body);
            var o_id = new ObjectId(req.body._id)
            const existingMap = await db.collection("Maps").findOne({ _id: o_id });

            if (!existingMap) {
                console.log("ERROR: Search For map has failed")
                return res
                    .status(404)
                    .json({
                        errorMessage: "ERROR: Search For map has failed"
                    })
            }

            if (existingMap.author == req.body.author) {
                db.collection("Maps").updateOne({ _id: o_id }, {$set: { file_size: req.body.file_size }});
                db.collection("Maps").updateOne({ _id: o_id }, {$set: { map: req.body.map }});
                res.json({status: 200});
            }else{
                console.log("ERROR: Unauthorized")
                return res
                    .status(401)
                    .json({
                        errorMessage: "ERROR: Unauthorized saving of map"
                    })
            }

            break;
        case "GET":
            const allPosts = await db.collection("Maps").find({}).toArray();
            res.json({ status: 200, data: allPosts });
            break;
    }
}