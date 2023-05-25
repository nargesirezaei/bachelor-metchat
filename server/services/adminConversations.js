const Conversations = require("../models/conversations");
const User = require("../models/user");
const Messages = require("../models/messages");
const Interests = require("../models/interests");
const UserInterests = require("../models/user-interests");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const conversations = await Conversations.find({})
        .populate("fromUserId", "firstName lastName")
        .populate("toUserId", "firstName lastName");

      const users = conversations.reduce((acc, conv) => {
        acc[conv.fromUserId._id] = conv.fromUserId;
        acc[conv.toUserId._id] = conv.toUserId;
        return acc;
      }, {});

      const usersList = Object.values(users);

      return res.send({
        users: usersList,
        conversations,
        status: true,
        message: null,
      });
    } catch (error) {
      // Handle error
      return res.status(500).send({
        status: false,
        message: "An error occurred",
      });
    }
  },

  deleteAllConversations: async (req, res, next) => {
    try {
      console.log("err111111111111111");
      await Conversations.deleteMany({});
      res.send({ message: "all conversations removed" });
    } catch (err) {
      console.log("err", err);
      res.send({
        status: false,
        message: "database error1",
      });
    }
  },

  getConversation: async (req, res) => {
    const conversationId = req.params.conversationId;

    await Messages.find({ conversationId })
      .sort({ createdAt: 1 })
      .exec()
      .then((messages) => {
        return res.status(200).send(messages);
      })
      .catch((err) => {
        return res.status(500).send("Failed to load messages" + err);
      });
  },
  allUsers: async (req, res) => {
    User.find({}, (err, result) => {
      if (err) return res.send({ status: false, message: "data base error" });
      res.send({ status: true, users: result });
    });
  },

  deleteUser: async (req, res) => {
    User.findOneAndRemove({ _id: req.body.userId }, (err, result) => {
      if (err)
        return res.send({
          status: false,
          message: "data base error",
        });
      if (!result)
        return res.send({
          status: true,
          message: "user not exists!",
        });

      res.send({ message: "user removed" });
    });
  },

  getUser: async (req, res) => {
    try {
      const userId = req.body.userId;
      const user = await User.findOne({ _id: userId });

      const userInterests = await UserInterests.find({
        userId: userId,
      }).populate("interestId", "title");

      return res.send({
        status: true,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          userInterests: userInterests.map(
            (interest) => interest.interestId.title
          ),
          bio: user.bio,
          avatar: user.avatar,
          allowEdit: req.body.contactId ? false : true,
        },
      });
    } catch (err) {
      console.error(err);
      return res.send({ status: false, message: "database error" });
    }
  },
};
