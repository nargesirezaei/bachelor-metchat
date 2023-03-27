
const Conversations = require("../models/conversations");

module.exports = {
    create: async (req, res) => {
        const { fromId, toId } = req.body;

        if (await Conversations.findOne({ fromId, toId }) || await Conversations.findOne({ fromId: toId, toId: fromId }))
            return res.json({ message: "Conversation already exists!" });

        await Conversations.create({
            fromId,
            toId,
        })
        .then(() => {
            return res.json({ message: "Conversation successflly created in database" });
        })
        .catch(() => {
            return res.json({ message: "Failed to create conversation in database" });
        });
    },

    delete: async (req, res) => {
        const { conversationId } = req.body;
        
        await Conversations.findOneAndDelete({ _id: conversationId }, (err, deletedConversation) => {
        if (err)
            return res.json({ message: "Failed to delete conversation" });

        else if (!deletedConversation)
            return res.json({ message: "Conversation not found"});

        return res.json({ message: "Conversation successfully deleted", deletedConversation });
        });        
    },

};