const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const profileSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    avatarImage : {
        type : String,
        default : "",
    },
    bio : {
        type : String,
        default : "",
        max : 150,
    },
});


const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;