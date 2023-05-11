const Contacts = require("../models/contacts");
const Conversations = require("../models/conversations");
const messages = require("../models/messages");
const Users = require("../models/user");

module.exports = {
    init: async (req, res, next) => {
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

    getAllMessages: (req, res, next) => {
        messages
            .find({ conversationId: req.params.conversationId })
            .then((result) => res.send({ status: true, messages: result }))
            .catch((err) =>
                res.send({
                    status: false,
                    message: "data base error",
                })
            );
    },
    delete: (req, res, next) => {
        messages.findOneAndRemove(
            { _id: req.params.messageId },
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

                res.send({ message: "message removed" });
            }
        );
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
            if (err)
                return res.send({ status: false, message: "data base error" });

            res.send({
                status: true,
                message: "message sent",
                result: createResult,
            });
        });
    },
};
