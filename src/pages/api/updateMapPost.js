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
    const db = client.db("Maps");
    const { updatepost } = req.body;
    console.log(req.body);
    switch (req.method) {
        case "POST":

        if (!updatepost) {
            console.log("ERROR: Post was not found")
            return res
                .status(400)
                .json({ errorMessage: "ERROR: Post was not found" });
        }
            
            var o_id = new ObjectId(updatepost._id)
            
            db.collection("Maps").updateOne({_id : o_id}, {$set: {title: updatepost.title}});
            db.collection("Maps").updateOne({_id : o_id}, {$set: {description: updatepost.description}});
                
            return res
                .status(200)
                .json({
                    message: "SUCCESS: Search request was successfull",
                })

            break;

    }
}