const Contacts = require("../models/contacts");
const User = require("../models/user");

module.exports = {
  add: (req, res, next) => {
    var userId = req.userId;
    var contactId = req.body.contactId;
    var contact = new Contacts({ userId, contactId });
    Contacts.findOne({ userId, contactId }, (err, result) => {
      if (err) return res.send({ status: false, message: "data base error" });
      if (!result) {
        contact.save((err) => {
          if (err)
            return res.send({ status: false, message: "data base error" });
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
        return res.send({ status: true, message: "contact not exists!" });

      res.send({ message: "contact removed" });
    });
  },
  myContacts: (req, res, next) => {
    var userId = req.userId;

    Contacts.find({ userId }, (err, result) => {
      if (err) return res.send({ status: false, message: "data base error" });
      res.send({ status: true, contacts: result });
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

  getUser: async (req, res) => {
    await User.findById(req.params.userId, "firstName lastName")
      .exec()
      .then((user) => {
        return res.status(200).send(user);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send("Error getting contacts");
      });
  },

  getAllUsers: async (req, res) => {
    await User.find(
      { _id: { $ne: req.query.id } },
      "_id firstName lastName email"
    )
      .then((users) => {
        return res
          .status(200)
          .send({ message: "Successfully got contacts", users });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send("Error getting contacts");
      });
  },
};
