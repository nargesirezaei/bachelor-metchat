const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationsSchema = new Schema({
  fromUserId: { type: String,require:true },
  toUserId: { type: String,require:true },
  intrestId: { type: String,require:true },
  finished:{type:Boolean,require:true,default:false},
  date: { type: Date,default:Date.now(),require:true },
});

const Conversations = mongoose.model('Conversations', conversationsSchema);

module.exports = Conversations;