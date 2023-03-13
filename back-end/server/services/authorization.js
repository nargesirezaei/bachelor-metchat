var secret_key = "123!@#asdASD";
const jwt = require('jsonwebtoken');


module.exports = {
    generateToken:(data)=>{//{userId:user._id}
         // Generate JWT token
         //signerer data med secret_key
         return jwt.sign(data, secret_key, {
            expiresIn: "1h",
          });
    },
    //tar imot token og sjekker om den er fortsatt gyldig
    isValidToken:(token)=>{
        //todo: check token with secret key
        return true;
    },
    //brukes til å beskytte visse ruter eller API-endepunkter ved å bekrefte at den innkommende forespørselen
    // har et gyldig JWT-token i autorisasjonsoverskriften
    verifyaccess:(req, res, next)=> {
        // HTTP header
        const authHeader = req.headers['authorization'];
        // "breare token"
        if (!authHeader) {
            return res.status(401).json({ message: 'Authentication failed! Token is missing.' });
        }
        try {
            //token will contain two elements: "Bearer" and the JWT token
            var token = authHeader.split(' ');
            const decoded = jwt.verify(token[1], secret_key);
            //funksjonen trekker ut brukerens ID fra det dekodede tokenet ved å bruke jwt.verify(token[1], secret_key).
            req.userId = decoded.userId;//{userId:user._id}
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Authentication failed! Invalid token.' });
        }
    }
}