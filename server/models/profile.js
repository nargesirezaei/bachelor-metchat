const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
