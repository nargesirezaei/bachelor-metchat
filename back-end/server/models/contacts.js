const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactsSchema = new Schema({
  userId: { type: String, required: true },
  contactId: { type: String, required: true },
  name: { type: String }
});

const Contacts = mongoose.model('Contacts', contactsSchema);

module.exports = Contacts;
