const mongoose = require("mongoose");

module.exports = {
  connectToDb: (cb) => {
    mongoose
      .connect("mongodb://localhost:27017/chat", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => cb("Connected to MongoDB"))
      .catch((err) => cb(err));
  },
};
