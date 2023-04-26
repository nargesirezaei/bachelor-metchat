const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  isAdmin:{type:Boolean,default:false}
});

const User = mongoose.model('User', userSchema);

module.exports = User;