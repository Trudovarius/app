var CompletedLesson = require('../models/completedLesson');
var Category = require('../models/category');

module.exports = (app, passport) => {

  // GET COMPLETED LESSONS
  app.post('/completed-lesson/create', (req, res) => {
    let completedLesson = new CompletedLesson();
    completedLesson.lessonId = req.body.lessonId;
    completedLesson.userId = req.body.userId;
    completedLesson.categoryId = req.body.categoryId;
    completedLesson.difficulty = req.body.difficulty;
    completedLesson.attempts = req.body.attempts;
    completedLesson.duration = req.body.duration;
    completedLesson.save((err, saved) => {
      if (err != null) {
        res.json(err);
      } else {
        res.json(saved);
      }
    });
  });

  // GET COMPLETED LESSONS BY USER ID OR CATEGORY ID
  app.post('/completed-lesson/get', async (req, res) => {
    let completedLesson;
    let find = {};
    if (req.body.userId)
      find.userId = req.body.userId;
    if (req.body.categoryId)
      find.categoryId = req.body.categoryId;
    completedLesson = await CompletedLesson.find(find);
    res.json(completedLesson);
  });
}
