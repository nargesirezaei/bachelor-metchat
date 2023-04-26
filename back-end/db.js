const mongoose = require("mongoose");

module.exports = {
    connectToDb: (cb) => {
        mongoose
            .connect("mongodb://127.0.0.1:27017/chat", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => cb("Connected to MongoDB"))
            .catch((err) => cb(err));
    },
};
