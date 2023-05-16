import runCors from './middleware';
import { promisify } from "util";
import { randomBytes } from "crypto";
import clientPromise from '../../../lib/mongo';
import { transporter, mailOptions } from '../../../config/nodemailer';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options

const generateToken = promisify(randomBytes);

export default async function handler(req, res) {
    // Run the middleware
    await runCors(req, res)
    console.log("adsf");
    // Rest of the API  logic
    if (req.method == "POST") {
        const email = req.body;
        if (!email) { //TODO: verify email address
            return res.status(400).json({ message: "Bad request" });
        }

        const token = (await generateToken(32)).toString("hex");
        let url = process.env.BASE_URL + '/resetpassword/' + token;
        console.log(url);
        try {
            await transporter.sendMail({
                from: 'cse416borderline@gmail.com',
                to: email,
                subject: "Reset Borderline Password",
                text: `Reset Link: ${url}`,
                html: `<h1>Reset Link</h1><p>${url}</p>`
            });
            return res.status(200).json({ success: true })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
    }
    return res.status(400).json({ message: "Bad request" });
}