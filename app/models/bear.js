const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Bear', BearSchema );
