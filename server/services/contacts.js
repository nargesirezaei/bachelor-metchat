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
      $and: [{ _id: { $nin: similarUserIds } }, { _id: { $ne: myUserId } }],
    });

    const similarUserInterests = await UserInterests.find({
      userId: { $in: similarContacts.map((c) => c._id) },
    })
      .populate("interestId")
      .lean();

    const similarContactsDict = {};
    similarContacts.forEach((x) => {
      similarContactsDict[x._id] = x;
      similarContactsDict[x._id].intrests = [];
    });

    await Promise.all(
      similarUserInterests.map(async (x) => {
        const contactId = x.userId.toString();
        const interest = x.interestId;
        if (similarContactsDict[contactId]) {
          const c = await Interests.findOne({
            _id: interest._id,
          }).lean();
          similarContactsDict[contactId].intrests.push(c);
        }
      })
    );

    const allContacts = Object.values(similarContactsDict)
      .map((x) => {
        if (x.intrests.length === 0) {
          x.intrests = null;
        }
        return {
          _id: x._id,
          firstName: x.firstName,
          lastName: x.lastName,
          email: x.email,
          intrests: x.intrests,
          avatar: x.avatar,
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

    // remove duplicates
    const uniqueContactsSet = new Set(
      allContacts.map((contact) => contact._id)
    );
    const uniqueContacts = Array.from(uniqueContactsSet).map((id) => {
      return allContacts.find((contact) => contact._id === id);
    });

    const myContactsIds = await Contacts.find({ userId })
      .exec()
      .then((results) => {
        return results
          .filter((x) => x._id !== userId)
          .map((mi) => mi.contactId);
      });

    const myContacts = await Users.find({
      _id: { $in: myContactsIds },
    });

    const filteredMyContacts = myContacts.filter((contact) => {
      return uniqueContacts.findIndex((c) => c._id === contact._id) === -1;
    });

    // remove duplicates
    const myContactsSet = new Set(
      filteredMyContacts.map((contact) => contact._id)
    );
    const uniqueMyContacts = Array.from(myContactsSet).map((id) => {
      return filteredMyContacts.find((contact) => contact._id === id);
    });

    console.log("userId", userId);
    console.log(
      "uniqueMyContacts",
      uniqueMyContacts.filter((x) => {
        if (x._id !== userId) return x;
      })
    );
    return res.send({
      status: true,
      message: null,
      allContacts: uniqueContacts,
      myContacts: uniqueMyContacts.filter((x) => x._id.toString() !== userId),
    });
  },
  add: (req, res, next) => {
    var userId = req.userId;
    var contactId = req.body.contactId;
    var contact = new Contacts({ userId, contactId });
    Contacts.findOne({ userId, contactId }, (err, result) => {
      if (err) return res.send({ status: false, message: "data base error" });
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
      if (err) return res.send({ status: false, message: "data base error" });
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
