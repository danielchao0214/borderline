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
    const { _id } = req.body;
    console.log(req.body);
    switch (req.method) {
        case "POST":
            
            var o_id = new ObjectId(_id)
            const forumPost = await db.collection("Forum").find({_id : o_id});
           
            let returnArray = []

            if (!forumPost) {
                console.log("ERROR: Search For Forum has failed")
                return res
                    .status(401)
                    .json({
                        errorMessage: "ERROR: Search For Forum has failed"
                    })
            }

            await forumPost.forEach(element => returnArray.push(element));

            return res
                .status(200)
                .json({
                    message: "SUCCESS: Search request was successfull",
                    forumPost: returnArray
                })

            break;

    }
}