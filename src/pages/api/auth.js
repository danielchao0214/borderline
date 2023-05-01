import runCors from './cors';
import clientPromise from '../../../lib/mongo';
const bcrypt = require('bcryptjs')

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

            const { firstName, lastName, username, email, password, confirmPassword } = req.body

            if (!firstName || !lastName || !email || !password || !confirmPassword || !username) {
                console.log("ERROR: Please enter all required fields.")
                return res
                    .status(400)
                    .json({ errorMessage: "ERROR: Please enter all required fields." });
            }

            if (password.length < 8) {
                console.log("ERROR: Password NOT long enough!!!");
                return res
                    .status(400)
                    .json({
                        errorMessage: "ERROR: Password NOT long enough!!! at least 8 characters."
                    });
            }

            if (password !== confirmPassword) {
                return res
                    .status(400)
                    .json({
                        errorMessage: "ERROR: Password does not match Confimation Password "
                    })
            }

            const existingUserEmail = await db.collection("Users").findOne({ email: email });
            const existingUsername = await db.collection("Users").findOne({ username: username });
            //console.log("existingUserEmail: " + existingUserEmail);
            //console.log("existingUsername: " + existingUsername);

            if (existingUserEmail) {
                console.log("ERROR: Email Address already exits")
                return res
                    .status(400)
                    .json({
                        errorMessage: "ERROR: Email Address already exits"
                    })
            }

            if (existingUsername) {
                console.log("ERROR: Username already exits")
                return res
                    .status(400)
                    .json({
                        success: false,
                        errorMessage: "ERROR: Username already exits"
                    })
            }

            //SALTING USER PASSWORD FOR DB
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const passwordHash = await bcrypt.hash(password, salt);

            //New User Object
            const newUser = ({
                firstName, lastName, username, email, passwordHash
            });

            //POST INFO TO DATABASE
            db.collection("Users").insertOne(newUser, function (err, res) {
                if (err) throw err;
                console.log(err);
                client.close();
            });

            res.json({ status: 200, message: "SUCCESS: User account has been created and added to the DB" });

            break;
        case "GET":
            //
            break;
    }
}