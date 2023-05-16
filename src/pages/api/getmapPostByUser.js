import runCors from './cors';
import clientPromise from '../../../lib/mongo';

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
    const { username } = req.body;
    console.log(req.body);
    switch (req.method) {

        case "POST":

            if (username == undefined) {
                console.log("ERROR: username is undefined")
                return res
                    .status(401)
                    .json({
                        errorMessage: "ERROR: Search or sortby is undefined"
                    })
            }

            let mapPost;

            mapPost = await db.collection("Maps").find({ author: username });

            let returnArray = []

            if (!mapPost) {
                console.log("ERROR: Search For user has failed in the DB")
                return res
                    .status(401)
                    .json({
                        errorMessage: "ERROR: Search For user has failed in the DB"
                    })
            }

            await mapPost.forEach(element => returnArray.push(element));

            return res
                .status(200)
                .json({
                    message: "SUCCESS: Search request was successfull",
                    mapPosts: returnArray,
                })

            break;

    }
}