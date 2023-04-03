const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
  conversationId: { type: String,require:true },
  fromId: { type: String,require:true },
  toId: { type: String,require:true },
  message: { type: String,require:true },
  dateTime: { type: String,require:true,default:Date.now() },
  seen:{type:Boolean ,require:true,default:false}
});

const Messages = mongoose.model('Messages', messagesSchema);

module.exports = Messages;