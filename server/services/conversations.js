
const Conversations = require("../models/conversations");

module.exports = {
    create: async (req, res) => {
        const { fromId, toId } = req.body;

        const date = new Date();
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedDate = `${dd}/${mm}/${yyyy}`;

        await Conversations.create({
            title: formattedDate,
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
        
        await Conversations.findByIdAndDelete(conversationId, (err, deletedConversation) => {
        if (err)
            return res.json({ message: "Failed to delete conversation" });

        else if (!deletedConversation)
            return res.json({ message: "Conversation not found"});

        return res.json({ message: "Conversation successfully deleted", deletedConversation });
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