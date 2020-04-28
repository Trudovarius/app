var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var categorySchema = mongoose.Schema({
  id       : String,
  name     : String,
  progress : Number,
  awardXp  : Number,
  course   : String
});


module.exports = mongoose.model('Category', categorySchema);
