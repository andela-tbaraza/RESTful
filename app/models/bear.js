const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
  name: string
});

module.exports = mongoose.model('BearSchema');
