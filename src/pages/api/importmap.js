import runCors from './cors';
import clientPromise from '../../../lib/mongo';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
export default async function handler(req, res) {
    // Run the middleware
    await runCors(req, res)

    // Rest of the API logic
    const client = await clientPromise;
    const db = client.db("Users");
    switch (req.method) {
        case "POST":
            console.log(req.body);
            db.collection("Users").insertOne(req.body, function(err, res){
                if (err) throw err;
                console.log(err);
                client.close();
            });

            res.json({status: 200});

            break;
        case "GET":
            const allPosts = await db.collection("Users").find({}).toArray();
            res.json({ status: 200, data: allPosts });
            break;
    }
}