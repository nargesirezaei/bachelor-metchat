const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
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
        message: {
            type: String,
            required: true,
        },
    },
        {
            timestamps: true
        }
); 

const Messages = mongoose.models.Messages
    ? mongoose.model('Messages')
    : mongoose.model('Messages', messageSchema);


module.exports = Messages;
