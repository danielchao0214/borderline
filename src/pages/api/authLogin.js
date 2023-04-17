import runCors from './cors';
import clientPromise from '../../../lib/mongo';
const bcrypt = require('bcryptjs')

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
export default async function handler(req, res) {
    // Run the middleware
    await runCors(req, res)

    const {method, query} = req;
    console.log("Method", method, query);

    // Rest of the API logic
    const client = await clientPromise;
    const db = client.db("Users");
    const{email, password} = req.body;
    console.log(req.body);
    switch (req.method) {
        case "POST":
            if(!email || !password){
                console.log("ERROR: Please Enter in all required fields");
                return res
                    .status(400)
                    .json({errorMessage: "ERROR: Please Enter in all required fields"})
            }
            
            const existingUser = await db.collection("Users").findOne({email: email});
            if(!existingUser){
                console.log("ERROR: Wrong Email or Password Provided")
                return res
                    .status(401)
                    .json({
                        errorMessage: "ERROR: Wrong Email or Password Provided"
                    })
            }

            const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
            if(!passwordCorrect) {
                console.log("ERROR: Wrong Email or Password Provided");
                return res
                    .status(401)
                    .json({
                        errorMessage:"ERROR: Wrong Email or Password Provided"
                    })
            }

            // LOGIN THE USER
                //temporary
            //login success prompt

            //console.log(existingUser);

            return res
                .status(200)
                .json({
                    message: "SUCCESS: User has been signed into their account",
                    user: existingUser
                })
               
            break;

    }
}