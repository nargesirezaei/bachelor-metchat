var secret_key = "123!@#asdASD";
const jwt = require("jsonwebtoken");

module.exports = {
    generateToken: (data) => {
        //{userId:user._id}
        // Generate JWT token
        //signerer data med secret_key
        return jwt.sign(data, secret_key, {
            expiresIn: "1h",
        });
    },
    //tar imot token og sjekker om den er fortsatt gyldig
    isValidToken: (token) => {
        //todo: check token with secret key
        return true;
    },
    //brukes til å beskytte visse ruter eller API-endepunkter ved å bekrefte at den innkommende forespørselen
    // har et gyldig JWT-token i autorisasjonsoverskriften
    verifyaccess: (req, res, next) => {
        // HTTP header
        const authHeader = req.headers["authorization"];
        // "breare token"
        if (!authHeader) {
            return res
                .status(401)
                .json({ message: "Authentication failed! Token is missing." });
        }
        try {
            // console.log("authHeader", authHeader);
            // //token will contain two elements: "Bearer" and the JWT token
            // var token = authHeader.split(" ");
            // console.log("token", token);
            // const decoded = jwt.verify(token[1], secret_key);
            // console.log("authHeader", authHeader);
            // //funksjonen trekker ut brukerens ID fra det dekodede tokenet ved å bruke jwt.verify(token[1], secret_key).
            // req.userId = decoded.userId; //{userId:user._id}
            const token = req.cookies.jwt_token;
            const user = JSON.parse(atob(token.split(".")[1]));
            console.log("user", user);
            req.userId = user.userId;
            next();
        } catch (error) {
            return res
                .status(401)
                .json({ message: "Authentication failed! Invalid token." });
        }
    },
};
