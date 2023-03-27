const User = require("../models/user");
const authorization = require("./authorization");

module.exports = {
    register: (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        
        
        // Check if user with email already exists
        User.findOne({ email }, async (err, existingUser) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error registering user" });
            }
            else if (existingUser) {
                return res.status(409).json({ message: "User with that email already exists" });
            }
            
            // Create new user
            await User.create({ firstName, lastName, email, password })
            .then(() => {
                // Send success response
                return res.status(200).json({ message: "User registered successfully" });            
            })
            .catch((err) => {
                console.log("123");
                console.error(err);
                return res.status(500).json({ message: "Error registering user" });
            });
        });
    },
    login: (req, res) => {

        const { email, password } = req.body;

        // Check if user with email exists
        User.findOne({ email }, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error logging in" });
        }

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Check if password is correct
        if(password !== user.password)
            return res.status(401).json({ message: "Invalid email or password" });
            
            var token = authorization.generateToken({ userId: user._id });
            // Send success response with token
            return res.status(200).json({ message: "Login successful", token });
        
        });
    },
};
