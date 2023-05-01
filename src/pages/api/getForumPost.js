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
    const db = client.db("Forum");
    const { search } = req.body;
    console.log(req.body);
    switch (req.method) {
        case "POST":

            let searchMB = "/MONGODB/i"

            const existingUser = await db.collection("Forum").find({ title: {'$regex' : search.value, '$options' : 'i'} }).limit(10);

            let returnArray = []

            if (!existingUser) {
                console.log("ERROR: Wrong Email or Password Provided")
                return res
                    .status(401)
                    .json({
                        errorMessage: "ERROR: Wrong Email or Password Provided"
                    })
            }

            await existingUser.forEach(element => returnArray.push(element));

            return res
                .status(200)
                .json({
                    message: "SUCCESS: User has been signed into their account",
                    forumPosts: returnArray
                })

            break;

    }
}