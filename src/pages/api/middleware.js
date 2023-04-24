import Cors from 'cors'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
    methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runCors(req, res) {
    return new Promise((resolve, reject) => {
        cors(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}

export const authMiddleware = (handler) => (req, res) => {
    const token = req.cookies.token;
  
    if (!token) {
      // Redirect to login page if no token found
      res.writeHead(302, { Location: '/login' });
      res.end();
      return;
    }
  
    try {
      // Verify JWT token
      const decoded = jwt.verify(token, 'mysecret');
  
      // Set user in request object for further processing
      req.user = decoded;
  
      // Call the protected page handler
      return handler(req, res);
    } catch (err) {
      // Redirect to login page if token verification fails
      res.writeHead(302, { Location: '/login' });
      res.end();
    }
  };