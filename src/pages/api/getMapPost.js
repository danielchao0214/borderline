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
    const { search, sortby, tagFilter } = req.body;
    console.log(req.body);
    switch (req.method) {

        case "POST":

            if (search == undefined || sortby == undefined || tagFilter == undefined) {
                console.log("ERROR: Search or sortby or tagFilter is undefined")
                return res
                    .status(401)
                    .json({
                        errorMessage: "ERROR: Search or sortby ot TagFilter is undefined"
                    })
            }

            const returnUser = await client.db("Users").collection("Users").find({ username: search }).limit(1);

            let mapPost;
            if (sortby === 1 || sortby === -1) {
                if (tagFilter === "") {
                    mapPost = await db.collection("Maps").find({ title: { '$regex': search, '$options': 'i' }, published: true }).limit(12).sort({ title: sortby });
                }
                else {
                    mapPost = await db.collection("Maps").find({ title: { '$regex': search, '$options': 'i' }, published: true, tags: tagFilter }).limit(12).sort({ title: sortby });
                }
            }
            else if (sortby === 2) {
                if (tagFilter === "") {
                    mapPost = await db.collection("Maps").find({ title: { '$regex': search, '$options': 'i' }, published: true }).limit(12).sort({ likes: -1 });
                }
                else {
                    mapPost = await db.collection("Maps").find({ title: { '$regex': search, '$options': 'i' }, published: true, tags: tagFilter }).limit(12).sort({ likes: -1 });
                }
            }
            else if (sortby === 3) {
                if (tagFilter === "") {
                    mapPost = await db.collection("Maps").find({ title: { '$regex': search, '$options': 'i' }, published: true }).limit(12).sort({ publish_date: 1 });
                }
                else {
                    mapPost = await db.collection("Maps").find({ title: { '$regex': search, '$options': 'i' }, published: true, tags: tagFilter }).limit(12).sort({ publish_date: 1 });
                }
            }
            let returnArray = []
            let retrunArrayUser = []

            if (!mapPost) {
                console.log("ERROR: Search For Forum has failed")
                return res
                    .status(401)
                    .json({
                        errorMessage: "ERROR: Search For Forum has failed"
                    })
            }

            await mapPost.forEach(element => returnArray.push(element));

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