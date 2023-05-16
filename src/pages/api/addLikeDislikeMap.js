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
    const { id, author, likedislike } = req.body;
    console.log(req.body);
    switch (req.method) {
        case "POST":

            if (!id || !author || likedislike === undefined) {
                console.log("ERROR: Please enter all required fields.")
                return res
                    .status(400)
                    .json({ errorMessage: "ERROR: Please enter all required fields." });
            }


            var o_id = new ObjectId(id)
            const mapPost = await db.collection("Maps").find({ _id: o_id });

            let returnArray = []

            if (!mapPost) {
                console.log("ERROR: Search For Forum has failed")
                return res
                    .status(401)
                    .json({
                        errorMessage: "ERROR: Search For Forum has failed"
                    })
            }

            await mapPost.forEach(element => returnArray.push(element));


            // if not inside the arry then add to array
            const i = returnArray[0].likedDislikedmaps.find(e => e.User === author)

            //if it is inside the array
            if (i !== undefined) {
                //if the current value isnt equal to the new value
                if (i.liked !== likedislike) {
                    //if liked is true (LIKE A POST and undo DISLIKE)
                    if (likedislike) {
                        //update like dislike counter                     
                        db.collection("Maps").updateOne({ _id: o_id }, { $inc: { likes: 1 } });
                        db.collection("Maps").updateOne({ _id: o_id }, { $inc: { dislikes: -1 } });

                        //update the like dislike array
                        db.collection("Maps").updateOne({ _id: o_id, likedDislikedmaps: i }, { $set: { 'likedDislikedmaps.$': { User: author, liked: likedislike } } })
                    }
                    //if liked is false (DISLIKE A POST and undo LIKE)
                    else {
                        //update like dislike counter                     
                        db.collection("Maps").updateOne({ _id: o_id }, { $inc: { likes: -1 } });
                        db.collection("Maps").updateOne({ _id: o_id }, { $inc: { dislikes: 1 } });

                        //update the like dislike array
                        db.collection("Maps").updateOne({ _id: o_id, likedDislikedmaps: i }, { $set: { 'likedDislikedmaps.$': { User: author, liked: likedislike } } })
                    }
                }
            }

            // if it is not inside the array
            else if (i === undefined) {
                if(likedislike){
                    db.collection("Maps").updateOne({ _id: o_id }, { $push: { likedDislikedmaps: { User: author, liked: likedislike } } })
                    db.collection("Maps").updateOne({ _id: o_id }, { $inc: { likes: 1 } });
                }
                else{
                    db.collection("Maps").updateOne({ _id: o_id }, { $push: { likedDislikedmaps: { User: author, liked: likedislike } } })
                    db.collection("Maps").updateOne({ _id: o_id }, { $inc: { dislikes: 1 } });
                }
            }


            return res
                .status(200)
                .json({
                    message: "SUCCESS: Search request was successfull",
                    //mapPost: returnArray
                })

            break;

    }
}