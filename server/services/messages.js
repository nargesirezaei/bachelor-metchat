const Contacts = require("../models/contacts");
const Messages = require("../models/messages");
const Users = require("../models/user");

module.exports = {
    init: async (req, res, next) => {
        const userId = req.userId;
        const contactId = req.body.contactId;
        var contact = "";
        if (contactId) contact = await Users.findOne({ _id: contactId });

        const myContactsIds = await Contacts.find({ userId })
            .exec()
            .then((results) => {
                return results.map((mi) => mi.contactId);
            });

        const myContacts = await Users.find({
            _id: { $in: myContactsIds },
        });

        return res.send({
            myContacts,
            contact,
            status: true,
            message: null,
        });
    },

    send: async (req, res) => {
        const { conversationId, fromId, toId, message } = req.body;

        await Messages.create({
            conversationId,
            fromId,
            toId,
            message,
        })
            .then(() => {
                return res
                    .status(200)
                    .send("Message successflly sent to database");
            })
            .catch((err) => {
                return res
                    .status(500)
                    .send("Failed to send message to database");
            });
    },

    edit: async (req, res) => {
        const { messageId, message } = req.body;

        await Messages.findById(messageId, (err, loadedMessage) => {
            if (err) return res.status(500).send("Failed to load message");
            else if (!loadedMessage)
                return res.status(404).send("Message not found");

            loadedMessage.message = message;
            return res.status(200).json(loadedMessage);
        });
    },

    getConversation: async (req, res) => {
        const conversationId = req.query.conversationId;

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

    getMessage: async (req, res) => {
        const { messageId } = req.params;

        await Messages.findById(messageId, (err, loadedMessage) => {
            if (err) return res.status(500).send("Failed to load message");
            else if (!loadedMessage)
                return res.status(404).send("Message not found");

            return res.status(200).send(loadedMessage);
        });
    },

    delete: async (req, res) => {
        const { messageId } = req.body;

        await Messages.findOneAndDelete({ _id: messageId }).exec(
            (err, deletedMessage) => {
                if (err)
                    return res.status(500).send("Failed to delete message");
                else if (!deletedMessage)
                    return res.status(404).send("Message not found");

                return res.status(200).send(deletedMessage);
            }
        );
    },

    seen: (req, res, next) => {
        Messages.findOneAndUpdate(
            { _id: req.body.messageId },
            { $set: { seen: true } },
            (err, result) => {
                if (err) return res.status(500).send("database error");
                if (!result) return res.status(404).send("message not exists!");

                res.status(200).send("message hase been read");
            }
        );
    },
};
