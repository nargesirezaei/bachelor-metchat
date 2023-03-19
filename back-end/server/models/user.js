const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        min : 3,
    },
    lastName : {
        type : String,
        required : true,
        min : 3,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        max : 50,
    },
    password : {
        type : String,
        required : true,
        min : 8,
    },

    contacts : {
        type : Array,
        required : true,
        default : [],
    },

    isBioSet : {
        type : Boolean,
        default : false,
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
    /*interests : {
        type : Array,
        default : [],
    },*/
    isAdmin:{
        type : Boolean,
        default : false,
    },
});


const User = mongoose.model('User', userSchema);

module.exports = User;