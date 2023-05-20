const Conversations = require("../models/conversations");
const Users = require("../models/user");

module.exports = {
  getAll: async (req, res, next) => {
    const userId = req.userId;
    const contactId = req.body.contactId;
    var contact = "";
    if (contactId) contact = await Users.findOne({ _id: contactId });

    const conversations = await Conversations.find({
      $or: [
        { $and: [{ fromUserId: userId }, { toUserId: contactId }] },
        { $and: [{ fromUserId: contactId }, { toUserId: userId }] },
      ],
    })
      .populate("fromUserId toUserId")
      .exec();

    return res.send({
      conversations,
      contact,
      status: true,
      message: null,
    });
  },
  add: async (req, res, next) => {
    var fromUserId = req.userId;
    var toUserId = req.body.toUserId;
    var title = req.body.title;
    if (!title) {
      var today = new Date();
      title = today
        .toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, "$3/$1/$2");
    }

    // Check if conversation with the same title exists for these users
    const existingConversation = await Conversations.findOne({
      $or: [
        {
          $and: [{ fromUserId: fromUserId }, { toUserId: toUserId }],
        },
        {
          $and: [{ fromUserId: toUserId }, { toUserId: fromUserId }],
        },
      ],
      title: title,
    });

    if (existingConversation) {
      return res.send({
        status: false,
        isExist: true,
        message: "conversation already exists",
        conversation: existingConversation,
      });
    }

    var conversation = new Conversations({
      fromUserId,
      toUserId,
      title,
    });

    conversation.save((err, createResult) => {
      if (err)
        return res.send({
          status: false,
          message: "database error",
        });

      Conversations.find({
        $or: [
          {
            $and: [{ fromUserId: fromUserId }, { toUserId: toUserId }],
          },
          {
            $and: [{ fromUserId: toUserId }, { toUserId: fromUserId }],
          },
        ],
      })
        .populate("fromUserId toUserId")
        .exec((err, conversations) => {
          if (err)
            return res.send({
              status: false,
              message: "database error",
            });

          res.send({
            status: true,
            message: "conversation created",
            conversation: createResult,
            conversations: conversations,
          });
        });
    });
  },
  get: (req, res, next) => {
    Conversations.findOne({ _id: req.params.conversationId }, (err, result) => {
      if (err)
        return res.send({
          status: false,
          message: "data base error",
        });
      return res.send({ status: true, conversation: result });
    });
  },

  // getAll: (req, res, next) => {
  //     Conversations.find(
  //         { fromUserId: req.userId, toUserId: req.body.toUserId },

  //         (err, result) => {
  //             if (err)
  //                 return res.send({
  //                     status: false,
  //                     message: "data base error",
  //                 });
  //             return res.send({ status: true, conversation: result });
  //         }
  //     );
  // },
  delete: (req, res, next) => {
    Conversations.findOneAndRemove(
      { _id: req.params.conversationId },
      (err, result) => {
        if (err)
          return res.send({
            status: false,
            message: "data base error",
          });
        if (!result)
          return res.send({
            status: true,
            message: "conversation not exists!",
          });

        res.send({ message: "conversation removed" });
      }
    );
  },
  finish: (req, res, next) => {
    Conversations.findOneAndUpdate(
      { _id: req.params.conversationId },
      { $set: { finished: true } },
      { new: true },
      (err, result) => {
        if (err)
          return res.send({
            status: false,
            message: "data base error",
          });
        return res.send({ status: true, conversation: result });
      }
    );
  },
};
