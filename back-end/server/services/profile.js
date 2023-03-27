const Profile = require("../models/profile");

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
            return res.status(401).json({ message: `Unsuccessfuly created bio: ${error}` });
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
            return res.status(401).json({ message: `Unsuccessfuly edited bio: ${error}` });
        });
    },
};