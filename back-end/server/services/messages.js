const messages = require('../models/message');

module.exports = {
    getAllMessages:(req,res,next)=>{
        messages.find(
            { conversationId: req.params.conversationId },
            (err, result) => {
              if (err) return res.send({ status: false, message: "data base error" });
              return res.send({ status: true, messages: result });
            }
          );
    },
    delete  :(req,res,next)=>{
        messages.findOneAndRemove({_id:req.params.messageId }, (err, result) => {
            if (err) return res.send({ status: false, message: "data base error" });
            if (!result)
              return res.send({ status: true, message: "message not exists!" });
      
            res.send({ message: "message removed" });
          });
    },
    seen  :(req,res,next)=>{
        messages.findOneAndUpdate({_id:req.body.messageId },{$set:{seen:true}}, (err, result) => {
            if (err) return res.send({ status: false, message: "data base error" });
            if (!result)
              return res.send({ status: true, message: "message not exists!" });
      
            res.send({ message: "message hase been read" });
          });
    },
    add:(req,res,next)=>{

        var message = new messages({...req.body,fromId:req.userId});
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