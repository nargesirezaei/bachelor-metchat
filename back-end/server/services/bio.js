const User = require("../models/user");

module.exports = {
    editProfile: async (req, res) => {
        const userId = req.params.userId,
            { avatar, bio, interests } = req.body;
        let status = 0,
            message = "";
        
        await User.findByIdAndUpdate( userId, {
            avatar,
            bio,
            $addToSet: { interests },
        })
        .then(() => {
            status = 200;
            message = "Successfuly edited bio";
        })
        .catch((error) => {
            status = 401
            message = `Unsuccessfuly edited bio ${error}`;
        });

        await User.findById( userId ).populate( "interests" ).exec((err, posts) => {
            return res.status(status).json({ message, posts });
        })
    },
};   