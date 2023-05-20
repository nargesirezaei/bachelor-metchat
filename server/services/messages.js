const Contacts = require("../models/contacts");
const Conversations = require("../models/conversations");
const Messages = require("../models/messages");
const messages = require("../models/messages");
const User = require("../models/user");
const Users = require("../models/user");

module.exports = {
  init: async (req, res, next) => {
    const userId = req.userId;
    const contactId = req.body.contactId;

    var conversations = null;
    var contact = null;
    var contacts = [];

    if (contactId) {
      contact = await Users.findOne({ _id: contactId });

      conversations = await Conversations.find({
        $or: [
          { $and: [{ fromUserId: userId }, { toUserId: contactId }] },
          { $and: [{ fromUserId: contactId }, { toUserId: userId }] },
        ],
      })
        .populate("fromUserId toUserId")
        .exec();
    } else {
      conversations = await Conversations.find({
        $or: [{ fromUserId: userId }, { toUserId: userId }],
      })
        .populate("fromUserId toUserId")
        .exec();
    }

    if (conversations) {
      conversations.forEach((conversation) => {
        if (conversation.fromUserId._id.toString() !== userId) {
          contacts.push(conversation.fromUserId);
        }
        if (conversation.toUserId._id.toString() !== userId) {
          contacts.push(conversation.toUserId);
        }
      });
    }

    const uniqueContacts = contacts.filter(
      (contact, index) =>
        contacts.findIndex(
          (c) => c._id.toString() === contact._id.toString()
        ) === index
    );

    return res.send({
      conversations,
      contact,
      contacts: uniqueContacts,
      status: true,
      message: null,
    });
  },

  getAllMessages: async (req, res, next) => {
    const userId = req.userId;
    const conversationId = req.params.conversationId;
    try {
      const conversation = await Conversations.findById(conversationId);
      if (!conversation) {
        throw new Error("Conversation not found");
      }
      const fromUser = await User.findById(conversation.fromUserId);
      const toUser = await User.findById(conversation.toUserId);
      if (!fromUser || !toUser) {
        throw new Error("User not found");
      }
      const messages = await Messages.find({ conversationId });
      return res.send({ status: true, messages, fromUser, toUser });
    } catch (err) {
      return res.send({ status: false, message: err.message });
    }
  },
  delete: (req, res, next) => {
    messages.findOneAndRemove({ _id: req.params.messageId }, (err, result) => {
      if (err)
        return res.send({
          status: false,
          message: "data base error",
        });
      if (!result)
        return res.send({
          status: true,
          message: "message not exists!",
        });

      res.send({ message: "message removed" });
    });
  },
  seen: (req, res, next) => {
    messages.findOneAndUpdate(
      { _id: req.body.messageId },
      { $set: { seen: true } },
      (err, result) => {
        if (err)
          return res.send({
            status: false,
            message: "data base error",
          });
        if (!result)
          return res.send({
            status: true,
            message: "message not exists!",
          });

        res.send({ message: "message hase been read" });
      }
    );
  },
  add: (req, res, next) => {
    var message = new messages({ ...req.body, fromId: req.userId });
    message.save((err, createResult) => {
      if (err) return res.send({ status: false, message: "data base error" });

      res.send({
        status: true,
        message: "message sent",
        result: createResult,
      });
    });
  },
};
