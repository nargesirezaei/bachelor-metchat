
const Conversations = require("../models/conversations");

module.exports = {
    create: async (req, res) => {
        const { fromId, toId } = req.body;

        const date = new Date(),
            year = date.getFullYear();
        let month = date.getMonth() + 1,
            day = date.getDate();

        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;

        const defaultTitle = `${day}/${month}/${year}`;

        await Conversations.create({
            title: defaultTitle,
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

    deleteById: async (req, res) => {
        const { conversationId } = req.body;
        
        await Conversations.findByIdAndDelete(conversationId, (err, deletedConversation) => {
        if (err)
            return res.json({ message: "Failed to delete conversation" });

        else if (!deletedConversation)
            return res.json({ message: "Conversation not found"});

        return res.json({ message: "Conversation successfully deleted", deletedConversation });
        });        
    },
    deleteByName: async (req, res) => {
        const { name1, name2 } = req.body;
        
        await Conversations.deleteMany({$or: [{fromId: name1, toId: name2}, {fromId: name2, toId: name1}]}, (err, deleted) => {
            if (err)
                return res.json({ message: "Failed to delete conversation" });
    
            else if (deleted.deletedCount === 0)
                return res.json({ message: "Conversation not found"});
    
            return res.json({ message: "Conversation successfully deleted", deleted });
        });
    },

    editTitle: async (req, res) => {
        const { conversationId, title } = req.body;

        await Conversations.findByIdAndUpdate(conversationId, { title })
        .then(() => {
            return res.json({ message: "Conversation title successflly edited" });
        })
        .catch(() => {
            return res.json({ message: "Failed to edit conversation title" });
        });
    },

};