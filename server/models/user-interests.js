const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInterestsSchema = new Schema({
    interestId: {
        type: String,
        require: true,
        ref: "Interests",
    },
    userId: { type: String, require: true },
});

const UserInterests = mongoose.model("UserInterests", userInterestsSchema);

module.exports = UserInterests;
