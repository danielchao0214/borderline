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
    const { search, sortby } = req.body;
    console.log(req.body);
    switch (req.method) {

        case "POST":

            if (search == undefined || sortby == undefined) {
                console.log("ERROR: Search or sortby is undefined")
                return res
                    .status(401)
                    .json({
                        errorMessage: "ERROR: Search or sortby is undefined"
                    })
            }


            const existingUser = await db.collection("Maps").find({ title: { '$regex': search, '$options': 'i' } }).limit(10).sort({ title: sortby });
            const returnUser = await client.db("Users").collection("Users").find({ username: search }).limit(1);

            let returnArray = []
            let retrunArrayUser = []

            if (!existingUser) {
                console.log("ERROR: Search For Forum has failed")
                return res
                    .status(401)
                    .json({
                        errorMessage: "ERROR: Search For Forum has failed"
                    })
            }

            await existingUser.forEach(element => returnArray.push(element));

            if (returnUser !== null) await returnUser.forEach(element => retrunArrayUser.push(element));

            //console.log(retrunArrayUser);

            return res
                .status(200)
                .json({
                    message: "SUCCESS: Search request was successfull",
                    mapPosts: returnArray,
                    user: retrunArrayUser
                })

            break;

    }
}