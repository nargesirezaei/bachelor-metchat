const Contacts = require("../models/contacts");
const Users = require("../models/user");
const UserInterests = require("../models/user-interests");

module.exports = {
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
    myContacts: (req, res, next) => {
        const userId = req.userId;
        Contacts.find({ userId })
            .then((result) => {
                res.send({ status: true, contacts: result });
            })
            .catch((err) => {
                res.send({ status: false, message: "data base error" });
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
                        isSimilar: true,
                    };
                }),
                contacts.map((x) => {
                    return {
                        _id: x._doc._id,
                        firstName: x._doc.firstName,
                        lastName: x._doc.lastName,
                        email: x._doc.email,
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
