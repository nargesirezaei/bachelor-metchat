const Conversations = require("../models/conversations");

module.exports = {
    add: (req, res, next) => {
        var fromUserId = req.userId;
        var toUserId = req.body.toUserId;
        var title = req.body.title;

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
                        $and: [
                            { fromUserId: fromUserId },
                            { toUserId: toUserId },
                        ],
                    },
                    {
                        $and: [
                            { fromUserId: toUserId },
                            { toUserId: fromUserId },
                        ],
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
        Conversations.findOne(
            { _id: req.params.conversationId },
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
    getAll: (req, res, next) => {
        Conversations.find(
            { fromUserId: req.userId, toUserId: req.body.toUserId },

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
