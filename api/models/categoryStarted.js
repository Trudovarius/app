var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var categoryStartedSchema = mongoose.Schema({
  id         : String,
  userId     : String,
  categoryId : String,
  difficulty : Number,
  createdAt  : {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('CategoryStarted', categoryStartedSchema);
