var secret_key = "123!@#asdASD";
const jwt = require('jsonwebtoken');
module.exports = {
    generateToken:(data)=>{
         // Generate JWT token
         return jwt.sign(data, secret_key, {
            expiresIn: "1h",
          });
    },
    isValidToken:(token)=>{
        //todo: check token with secret key
        return true;
    }
}