const Interests = require("../models/interests");

module.exports = {
    create: async (req, res) => {
        var title = req.body.title;

        await Interests.create({ title })
        .then(() => {
            return res.send({ status: true, message: "interest added" });
        })
        .catch(() => {
            return res.send({ status: false, message: "database error" });
        });
    },

    delete: (req, res) => {
        var interestId = req.params.interestId;

        Interests.findOneAndRemove({ _id: interestId }, (err, result) => {
            if (err) return res.send({ status: false, message: "database error" });
            if (!result)
                return res.send({ status: false, message: "interest does not exist!" });

            res.send({ status:true,message: "interest removed" });
        });
    },

    getAll: (req, res) => {
        Interests.find({}, (err, result) => {
            if (err) return res.send({ status: false, message: "data base error" });
            res.send({ status: true, interests: result });
        });
    },

    get: (req, res) => {
        var interestId = req.params.interestId;
        Interests.findOne({ _id: interestId }, (err, result) => {
            if (err) return res.send({ status: false, message: "data base error" });
            res.send({ status: true, interest: result });
        });
    },
  /*update: (req, res, next) => {
    var interestId = req.params.interestId;
    Interests.updateOne(
      { _id: interestId },
      { $set: { title: req.body.title } }
    )
      .then((result) => {
        // The `result` variable contains the number of documents that were updated
        res.send({
          result: true,
          message: `Updated ${result.nModified} Interests documents successfully`,
        });
        // Add any other code that you want to execute after updating the UserContact documents
      })
      .catch((error) => {
        res.send({
          result: false,
          message: "Error while updating UserContact documents:"+error,
        });
        // Add any error handling code here
      });
  },*/
};
