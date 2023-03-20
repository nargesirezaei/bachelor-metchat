const User = require("../models/user");

module.exports = {
    editProfile: async (req, res) => {
        const userId = req.params.userId,
            { avatarImage, bio } = req.body;
        
        await User.findByIdAndUpdate( userId, {
            avatarImage,
            bio,
        })
        .then(() => {
            return res.status(200).json({ message: "Successfuly edited bio" });
        })
        .catch((error) => {
            return res.status(401).json({ message: `Unsuccessfuly edited bio ${error}` });
        });
    },
};