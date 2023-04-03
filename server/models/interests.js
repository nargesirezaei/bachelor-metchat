const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interestsSchema = new Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  }
});

const Interests = mongoose.model('Interests', interestsSchema);

module.exports = Interests;