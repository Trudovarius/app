var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var courseSchema = mongoose.Schema({
  id       : String,
  progress : Number,
  name     : String

});

module.exports = mongoose.model('Course', courseSchema);
