const Conversations = require("../models/conversations");
const User = require("../models/user");
const Messages = require("../models/messages");

module.exports = {
  create: async (req, res) => {
    const { fromId, toId } = req.body;

    const date = new Date(),
      year = date.getFullYear();
    let month = date.getMonth() + 1,
      day = date.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    const defaultTitle = `${day}/${month}/${year}`;

    await Conversations.create({
      title: defaultTitle,
      fromId,
      toId,
    })
      .then(() => {
        return res
          .status(200)
          .send("Conversation successflly created in database");
      })
      .catch(() => {
        return res
          .status(500)
          .send("Failed to create conversation in database");
      });
  },

  conversations: async (req, res) => {
    const userId = req.params.userId;

    await Conversations.find({ $or: [{ fromId: userId }, { toId: userId }] })
      .sort({ updatedAt: 1 })
      .exec()
      .then((conversations) => {
        return res.status(200).send(conversations);
      })
      .catch((err) => {
        return res.status(500).send("Failed to load conversations:\r\n" + err);
      });
  },

  getAllConversations: async (req, res) => {
    await Conversations.find()
      .sort({ createdAt: 1 })
      .exec()
      .then((conversations) => {
        return res.status(200).send(conversations);
      })
      .catch((err) => {
        return res.status(500).send("Failed to load conversations:\r\n:" + err);
      });
  },

  deleteById: async (req, res) => {
    const { conversationId } = req.body;

    await Conversations.findByIdAndDelete(conversationId).exec(
      (err, deletedConversation) => {
        if (err) return res.status(500).send("Failed to delete conversation");
        else if (!deletedConversation)
          return res.status(404).send("Conversation not found");

        return res.status(200).send(deletedConversation);
      }
    );
  },
  deleteByName: async (req, res) => {
    const { name1, name2 } = req.body;

    await Conversations.deleteMany({
      $or: [
        { fromId: name1, toId: name2 },
        { fromId: name2, toId: name1 },
      ],
    }).exec((err, deleted) => {
      if (err) return res.status(500).send("Failed to delete conversation");
      else if (deleted.deletedCount === 0)
        return res.status(404).send("Conversation not found");

      return res.status(200).send(deleted);
    });
  },

  editTitle: async (req, res) => {
    const { conversationId, title } = req.body;

    await Conversations.findByIdAndUpdate(conversationId, { title })
      .then(() => {
        return res.status(200).send("Conversation title successflly edited");
      })
      .catch(() => {
        return res.status(500).send("Failed to edit conversation title");
      });
  },

  /* Conversation.findById(conversationId).populate('messages').exec((err, conversation) => {
    if (err) {
      return res.status(500).send('Failed to fetch conversation');
    }
    if (!conversation) {
      return res.status(404).send('Conversation not found');
    }
    return res.status(200).send(conversation);
    }),*/
};
