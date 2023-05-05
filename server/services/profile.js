const Interests = require("../models/interests");
const Profile = require("../models/profile");
const User = require("../models/user");
const UserInterests = require("../models/user-interests");

module.exports = {
    changeBio: (req, res) => {
        let userId = req.userId;
        var bio = req.body.bio;
        User.findOneAndUpdate(
            { _id: userId },
            { $set: { bio } },
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

                res.send({ message: "bio changed" });
            }
        );
    },
    changeAvatar: (req, res) => {
        let userId = req.userId;
        var avatar = req.body.avatar;
        User.findOneAndUpdate(
            { _id: userId },
            { $set: { avatar } },
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

                res.send({ message: "avatar changed" });
            }
        );
    },

    profile: async (req, res) => {
        try {
            const userId = req.body.contactId ?? req.userId;
            const user = await User.findOne({ _id: userId });
            const interests = await Interests.find({});
            const userInterests = await UserInterests.find({ userId: userId });

            return res.send({
                status: true,
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    interests,
                    userInterests: userInterests,
                    bio: user.bio,
                    avatar: user.avatar,
                    allowEdit: req.body.contactId ? false : true,
                },
            });
        } catch (err) {
            console.error(err);
            return res.send({ status: false, message: "database error" });
        }
    },

    userInfo: (req, res) => {
        var userId = req.params.userId;
        User.findOne({ _id: userId }, (err, result) => {
            if (err)
                return res.send({ status: false, message: "database error" });
            return res.send({
                status: true,
                user: {
                    firstName: result.firstName,
                    lastName: result.lastName,
                    bio: result.bio,
                },
            });
        });
    },

    uploadAvatar: (req, res, next) => {
        upload.single("avatar"),
            (req, res) => {
                if (!req.file) {
                    return res
                        .status(400)
                        .send({ message: "No file uploaded" });
                }

                // Save the file to the database or file system
                // ...

                res.send({ message: "File uploaded successfully" });
            };
    },
};

/**
 * const Profile = require("../models/profile");

module.exports = {
    create: async (req, res) => {
        const { userId, avatarImage, bio } = req.body;
        
        await Profile.create( {
            userId,
            avatarImage,
            bio,
        })
        .then(() => {
            return res.status(200).json({ message: "Successfuly created bio" });
        })
        .catch((error) => {
            return res.status(401).json({ message: Unsuccessfuly created bio: ${error} });
        });
    },

    edit: async (req, res) => {
        const { userId, avatarImage, bio } = req.body;
        
        await Profile.findOneAndUpdate( { userId }, {
            avatarImage,
            bio,
        })
        .then(() => {
            return res.status(200).json({ message: "Successfuly edited bio" });
        })
        .catch((error) => {
            return res.status(401).json({ message: Unsuccessfuly edited bio: ${error} });
        });
    },
};

 */
