var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var categorySchema = mongoose.Schema({
  name     : String,
  awardXp  : Number,
  course   : String
});


module.exports = mongoose.model('Category', categorySchema);
