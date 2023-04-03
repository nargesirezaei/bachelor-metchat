const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        fromId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        toId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        seen: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
); 

const Conversations = mongoose.models.Conversations
    ? mongoose.model('Conversations')
    : mongoose.model('Conversations', conversationSchema);

module.exports = Conversations;
