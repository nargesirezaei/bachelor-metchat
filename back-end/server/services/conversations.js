const Conversations = require("../models/conversation");

module.exports = {
  add: (req, res, next) => {
    var fromUserId = req.userId;
    var toUserId = req.body.toUserId;
    var intrestId = req.body.intrestId;
    var conversation = new Conversations({ fromUserId, toUserId,intrestId });

    Conversations.findOne({ fromUserId, toUserId,finished:false }, (err, result) => {
      if (err) return res.send({ status: false, message: "data base error" });
      else {
        if (!result) {
          conversation.save((err, createResult) => {
            if (err)
              return res.send({ status: false, message: "data base error" });

            res.send({
              status: true,
              message: "conversation created",
              conversation: createResult,
            });
          });
        } else {
          res.send({
            status: true,
            message: "already exists",
            conversation: result,
          });
        }
      }
    });
  },
  get: (req, res, next) => {
    Conversations.findOne(
      { _id:req.params.conversationId },
      (err, result) => {
        if (err) return res.send({ status: false, message: "data base error" });
        return res.send({ status: true, conversation: result });
      }
    );
  },
  getAll: (req, res, next) => {
    Conversations.find(
        { fromUserId: req.userId },
        (err, result) => {
          if (err) return res.send({ status: false, message: "data base error" });
          return res.send({ status: true, conversation: result });
        }
      );
  },
  delete: (req, res, next) => {
    Conversations.findOneAndRemove({_id:req.params.conversationId }, (err, result) => {
        if (err) return res.send({ status: false, message: "data base error" });
        if (!result)
          return res.send({ status: true, message: "conversation not exists!" });
  
        res.send({ message: "conversation removed" });
      });
  },
  finish: (req,res,next)=>{
    Conversations.findOneAndUpdate({_id:req.params.conversationId},{$set:{finished:true}},{new:true},(err,result)=>{
      if (err) return res.send({ status: false, message: "data base error" });
      return res.send({ status: true, conversation: result });
    })
  }
};
