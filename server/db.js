const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://mello:SEd3Z6pFYnKmoImW@metchat.s6mhyez.mongodb.net/?retryWrites=true&w=majority";

module.exports = {
  connectToDb: (cb) => {
    mongoose
      .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => cb("Connected to MongoDB"))
      .catch((err) => cb(err));
  },
};
