const UserInterets = require("../models/user-interests");

module.exports = {
  create: (req, res, next) => {
    var userId = req.userId;
    var interestId = req.body.interestId;
    UserInterets.findOne({ userId, interestId }, (err, result) => {
      if (err) return res.send({ status: false, message: "data base error" });
      if (!result) {
        var userInterests = new UserInterets({ userId, interestId });
        userInterests.save((err) => {
          if (err)
            return res.send({ status: false, message: "data base error" });
          res.send({ status: true, message: "user interest added" });
        });
      } else {
        res.send({status:false,message:'user interest already exists'})
      }
    });
  },
  delete: (req, res, next) => {
    var userId = req.userId;
    var interestId = req.body.interestId;

    UserInterets.findOneAndRemove({ userId, interestId }, (err, result) => {
      if (err) return res.send({ status: false, message: "data base error" });
      if (!result)
        return res.send({ status: true, message: "user interest not exists!" });

      res.send({ message: "user interest removed" });
    });
  },
  getAll: (req, res, next) => {
    var userId = req.userId;

    UserInterets.find({ userId }, (err, result) => {
      if (err) return res.send({ status: false, message: "data base error" });
      res.send({ status: true, interests: result });
    });
  },
};
