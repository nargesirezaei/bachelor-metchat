
const Messages = require("../models/messages");

module.exports = {
    create: async (req, res) => {
        const { conversationId, fromId, toId, message } = req.body;

        await Messages.create({
            conversationId,
            fromId,
            toId,
            message,
        })
        .then(() => {
            return res.json({ message: "Message successflly sent to database" });
        })
        .catch((err) => {
            return res.json({ message: "Failed to send message to database" });
        });
    },

    edit: async (req, res) => {
        const { messageId, message } = req.body;
        
        await Messages.findById((messageId), (err, loadedMessage) => {
            if (err)
                return res.json({ message: "Failed to load message" });

            else if (!loadedMessage)
                return res.json({ message: "Message not found"});

            loadedMessage.message = message;
            return res.json({ message: "Message successfully edited", loadedMessage });
        });
    },

    getConversation: async (req, res) => {
        const { conversationId } = req.body;

        await Messages.find({ conversationId }).sort({ createdAt: 1 })
        .then((loadedMessages) => {
            return res.json({ message: "Messages successfully loaded", loadedMessages });
        })
        .catch((err) => {
            return res.json({ message: "Failed to load messages" + err });
        });        
    },

    getMessage: async (req, res) => {
        const { messageId } = req.params;
        
        await Messages.findById((messageId), (err, loadedMessage) => {
            if (err)
                return res.json({ message: "Failed to load message" });

            else if (!loadedMessage)
                return res.json({ message: "Message not found"});

            return res.json({ message: "Message successfully loaded", loadedMessage });
        });
    },

    init: {

    },

    delete: async (req, res) => {
        const { messageId } = req.body;
        
        await Messages.findOneAndDelete({ _id: messageId }, (err, deletedMessage) => {
        if (err)
            return res.json({ message: "Failed to delete message" });

        else if (!deletedMessage)
            return res.json({ message: "Message not found"});

        return res.json({ message: "Messages successfully deleted", deletedMessage });
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
};



