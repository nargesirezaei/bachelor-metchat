const User = require("../models/user");
const authorization = require("./authorization");

module.exports = {
    userInfo: (req, res) => {
        const token = req.cookies.jwt_token;
        if (token) {
            const user = JSON.parse(atob(token.split(".")[1]));

            User.findOne({ _id: user.userId })
                .then((user) => {
                    return res.status(200).json({
                        token,
                        expiry: 60,
                        userName: user.email,
                        displayName: user.firstName + " " + user.lastName,
                        userId: user._id,
                        isAdmin: user.isAdmin,
                    });
                })
                .catch((err) => {
                    return res
                        .status(500)
                        .json({ message: "Error in get user" });
                });
        } else {
            return res.status(401).json({ message: "Access Denied!" });
        }
    },

    register: (req, res) => {
        const { firstName, lastName, email, password } = req.body;

        // Check if user with email already exists
        User.findOne({ email })
            .then((existingUser) => {
                if (existingUser) {
                    return res.status(409).json({
                        message: "User with that email already exists",
                    });
                }

                // Create new user
                const user = new User({ firstName, lastName, email, password });
                user.save()
                    .then(() => {
                        // Send success response
                        return res
                            .status(200)
                            .json({ message: "User registered successfully" });
                    })
                    .catch((err) => {
                        console.error(err);
                        return res
                            .status(500)
                            .json({ message: "Error registering user" });
                    });
            })
            .catch((err) => {
                console.error(err);
                return res
                    .status(500)
                    .json({ message: "Error registering user" });
            });
    },

    logout: (req, res) => {
        res.clearCookie("jwt_token");
        res.end();
    },

    login: (req, res, next) => {
        const { email, password } = req.body;
        // Check if user with email exists
        User.findOne({ email: email })
            .then((user) => {
                if (!user) {
                    return res
                        .status(401)
                        .json({ message: "Invalid email or password" });
                }
                // Check if password is correct
                if (password != user.password)
                    return res
                        .status(401)
                        .json({ message: "Invalid email or password" });

                var token = authorization.generateToken({ userId: user._id });

                const expiry = new Date(Date.now() + 86400000); //now + 1day

                res.cookie("jwt_token", token, {
                    expires: expiry,
                    httpOnly: false,
                });

                // Send success response with token
                return res.status(200).json({
                    message: "Login successful",
                    token,
                    expiry: expiry,
                    userName: user.email,
                    displayName: user.firstName + " " + user.lastName,
                });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({ message: "Error logging in" });
            });
    },
    changePassword: (req, res) => {
        var userId = req.userId;
        var password = req.body.password;
        User.findOneAndUpdate(
            { _id: userId },
            { $set: { password } },
            (err, result) => {
                if (err)
                    return res.send({
                        status: false,
                        message: "data base error",
                    });
                if (!result)
                    return res.send({
                        status: true,
                        message: "user not exists!",
                    });

                res.send({ message: "password changed" });
            }
        );
    },
};
