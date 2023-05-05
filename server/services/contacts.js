const Contacts = require("../models/contacts");
const Interests = require("../models/interests");
const Users = require("../models/user");
const UserInterests = require("../models/user-interests");
const interests = require("./interests");

module.exports = {
    init: async (req, res, next) => {
        const userId = req.userId;
        const myUserId = req.userId;

        const myInterestIds = await UserInterests.find({ userId: myUserId })
            .exec()
            .then((results) => {
                return results.map((mi) => mi.interestId);
            });

        const similarUserIds = await UserInterests.find({
            interestId: { $in: myInterestIds },
            userId: { $ne: myUserId },
        }).distinct("userId");

        const similarContacts = await Users.find({
            _id: { $in: similarUserIds },
        });

        const contacts = await Users.find({
            _id: { $nin: similarUserIds },
            _id: { $ne: myUserId },
        });

        const allContacts = similarContacts
            .map((x) => {
                var intrests = [];
                UserInterests.find({
                    userId: x._doc._id,
                }).then((u) =>
                    u.map((v) => {
                        Interests.findOne({ _id: v.interestId }).then((c) =>
                            intrests.push(c)
                        );
                    })
                );
                return {
                    _id: x._doc._id,
                    firstName: x._doc.firstName,
                    lastName: x._doc.lastName,
                    email: x._doc.email,
                    intrests,
                    avatar: x._doc.avatar,
                    isSimilar: true,
                };
            })
            .concat(
                contacts.map((x) => {
                    return {
                        _id: x._doc._id,
                        firstName: x._doc.firstName,
                        lastName: x._doc.lastName,
                        email: x._doc.email,
                        avatar: x._doc.avatar,
                        isSimilar: false,
                    };
                })
            );

        const myContactsIds = await Contacts.find({ userId })
            .exec()
            .then((results) => {
                return results.map((mi) => mi.contactId);
            });
        //.distinct("contactId");
        const myContacts = await Users.find({
            _id: { $in: myContactsIds },
        });

        return res.send({
            allContacts,
            myContacts,
            status: true,
            message: null,
        });
    },

    add: (req, res, next) => {
        var userId = req.userId;
        var contactId = req.body.contactId;
        var contact = new Contacts({ userId, contactId });
        Contacts.findOne({ userId, contactId }, (err, result) => {
            if (err)
                return res.send({ status: false, message: "data base error" });
            if (!result) {
                contact.save((err) => {
                    if (err)
                        return res.send({
                            status: false,
                            message: "data base error",
                        });
                    res.send({ status: true, message: "contact added" });
                });
            } else {
                res.send({ status: false, message: "contact already exists" });
            }
        });
    },
    remove: (req, res, next) => {
        var userId = req.userId;
        var contactId = req.body.contactId;

        Contacts.findOneAndRemove({ userId, contactId }, (err, result) => {
            if (err)
                return res.send({ status: false, message: "data base error" });
            if (!result)
                return res.send({
                    status: true,
                    message: "contact not exists!",
                });

            res.send({ message: "contact removed" });
        });
    },
    myContacts: async (req, res, next) => {
        const userId = req.userId;
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
            status: true,
            message: null,
        });
    },
    allContacts: async (req, res, next) => {
        const myUserId = req.userId;

        const myInterestIds = await UserInterests.find({ userId: myUserId })
            .exec()
            .then((results) => {
                return results.map((mi) => mi.interestId);
            });

        const similarUserIds = await UserInterests.find({
            interestId: { $in: myInterestIds },
            userId: { $ne: myUserId },
        }).distinct("userId");

        const similarContacts = await Users.find({
            _id: { $in: similarUserIds },
        });

        const contacts = await Users.find({
            userId: { $nin: similarUserIds },
            userId: { $ne: myUserId },
        });

        return res.send({
            data: [
                similarContacts.map((x) => {
                    return {
                        _id: x._doc._id,
                        firstName: x._doc.firstName,
                        lastName: x._doc.lastName,
                        email: x._doc.email,
                        avatar: x._doc.avatar,
                        isSimilar: true,
                    };
                }),
                contacts.map((x) => {
                    return {
                        _id: x._doc._id,
                        firstName: x._doc.firstName,
                        lastName: x._doc.lastName,
                        email: x._doc.email,
                        avatar: x._doc.avatar,
                        isSimilar: false,
                    };
                }),
            ],
            status: true,
            message: null,
        });
    },
    UpdateMyContact: (req, res, next) => {
        Contacts.updateMany({ userId: req.userId }, { $set: { name: "ehsan" } })
            .then((result) => {
                // The `result` variable contains the number of documents that were updated
                res.send(
                    `Updated ${result.nModified} UserContact documents successfully`
                );
                // Add any other code that you want to execute after updating the UserContact documents
            })
            .catch((error) => {
                res.send("Error while updating UserContact documents:", error);
                // Add any error handling code here
            });
    },
};
