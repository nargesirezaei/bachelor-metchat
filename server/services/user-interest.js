const UserInterets = require("../models/user-interests");

module.exports = {
    create: (req, res, next) => {
        const userId = req.userId;
        const interestId = req.body.interestId;
        UserInterets.findOne({ userId, interestId }, (err, result) => {
            if (err)
                return res.send({ status: false, message: "database error" });
            if (!result) {
                const userInterests = new UserInterets({
                    userId,
                    interestId,
                });
                console.log("userInterests", userInterests);
                userInterests.save((err, savedUserInterest) => {
                    if (err)
                        return res.send({
                            status: false,
                            message: "database error",
                        });
                    res.send({
                        status: true,
                        message: "user interest added",
                        userInterest: savedUserInterest,
                    });
                });
            } else {
                res.send({
                    status: false,
                    message: "user interest already exists",
                });
            }
        });
    },
    delete: (req, res, next) => {
        const userId = req.userId;
        const interestId = req.body.interestId;

        UserInterets.findOneAndRemove({ userId, interestId }, (err, result) => {
            if (err)
                return res.send({ status: false, message: "data base error" });
            if (!result)
                return res.send({
                    status: true,
                    message: "user interest not exists!",
                });

            res.send({ message: "user interest removed" });
        });
    },

    getAll: async (req, res) => {
        const userId = req.query.userId;

        await UserInterets.find({ userId }, "interestId -_id")
            .populate("interestId")
            .then((result) => {
                return res.status(200).send(result);
            })
            .catch(() => {
                return res.status(500).send("database error");
            });

        /*UserInterets.find({ userId }, (err, result) => {
      if (err) return res.send({ status: false, message: "database error" });
      res.send({ status: true, interests: result });
      console.log(result);
    });*/
    },
};
