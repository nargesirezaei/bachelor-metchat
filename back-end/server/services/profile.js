const User = require("../models/user");

module.exports = {
    initUserInfo: async (req, res) => {
        //var { userId } 
        var user = await User.find({});
        // var user = {
        //     firstName: "f",
        //     lastName: "l",
        //     userName: "narges",
        //     isAdmin: false,
        // };
        var result = { user };
        res.send(result);
    },
};