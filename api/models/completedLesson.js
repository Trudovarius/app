var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var completedLessonSchema = mongoose.Schema({
  id         : String,
  lessonId   : String,
  userId     : String,
  categoryId : String,
  difficulty : Number,
  attempts   : Number,
  duration   : Number,
  createdAt  : {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('CompletedLesson', completedLessonSchema);
