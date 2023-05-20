const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        toUserId: {
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

const Conversations = mongoose.model("Conversations", conversationSchema);

module.exports = Conversations;

// module.exports = mongoose.models.Conversations || mongoose.model('Conversations', conversationSchema);
