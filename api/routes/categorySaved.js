var CategoryStarted = require('../models/categoryStarted');

module.exports = (app, passport) => {

  app.post('/category/take', (req, res) => {
    // create record that user started a category
    let categoryStarted = new CategoryStarted();
    categoryStarted.userId = req.userId;
    categoryStarted.categoryId = req.categoryId;
    categoryStarted.difficulty = req.difficulty;
    categoryStarted.save((err, saved) => {
      if (err != null) {
        res.json(err);
      } else {
        res.json(saved);
      }
    });
  });

  app.post('/cagetory/get', (req, res) => {
    let categoriesStarted = CategoryStarted.find({ userId: req.userId});
    res.json(categoriesStarted);
  });
}
