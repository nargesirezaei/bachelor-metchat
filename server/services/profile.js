const Profile = require("../models/profile");

module.exports = {
    changeBio: (req, res) => {
        let userId = req.userId;
        var bio = req.body.bio;
        User.findOneAndUpdate({ _id: userId }, { $set: { bio } }, (err, result) => {
        if (err) return res.send({ status: false, message: "data base error" });
        if (!result)
            return res.send({ status: true, message: "user not exists!" });

        res.send({ message: "bio changed" });
        });
    },

    me: (req, res) => {
        let userId = req.userId;
        User.findOne({ _id: userId }, (err, result) => {
        if (err) return res.send({ status: false, message: "database error" });
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

    userInfo: (req, res) => {
        var userId = req.params.userId;
        User.findOne({ _id: userId }, (err, result) => {
        if (err) return res.send({ status: false, message: "database error" });
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
            return res.status(400).send({ message: "No file uploaded" });
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