const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationsSchema = new Schema({
  fromUserId: { type: String,require:true },
  toUserId: { type: String,require:true },
  date: { type: Date,default:Date.now(),require:true },
});

const Conversations = mongoose.model('Conversations', conversationsSchema);

module.exports = Conversations;