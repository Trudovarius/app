var CategoryStarted = require('../models/categoryStarted');
var Category = require('../models/category');

module.exports = (app, passport) => {

  // CREATE STARTED CATEGORY
  app.post('/category/start', (req, res) => {
    let categoryStarted = new CategoryStarted();
    categoryStarted.userId = req.body.userId;
    categoryStarted.categoryId = req.body.categoryId;
    categoryStarted.difficulty = req.body.difficulty;
    categoryStarted.save((err, saved) => {
      if (err != null) {
        res.json(err);
      } else {
        res.json(saved);
      }
    });
  });

  // GET STARTED ALL CATEGORIES BY USER ID
  app.post('/cagetory/started/get', async (req, res) => {
    let categoryStarted;
    if (req.body.userId && req.body.categoryId) {
      categoryStarted = await CategoryStarted.find(
      {
          userId: req.body.userId,
          categoryId: req.body.categoryId
      });
    } else if (req.body.userId) {
      categoryStarted = await CategoryStarted.find({ userId: req.body.userId});
    }
    res.json(categoryStarted);
  });

  // CREATE CATEGORY
  app.post('/category/create', (req,res) => {
    console.log(req.body)
    let category = new Category();
    category.name = req.body.name;
    category.awardXp = req.body.awardXp;
    category.course = req.body.course;
    category.save((err, saved) => {
      if (err != null) {
        res.json(err);
      } else {
        res.json(saved);
      }
    });
  });

  // UPDATE STARTED CATEGORY
  app.post('/category/started/update', async (req, res) => {
    let categoryStarted = CategoryStarted.findOneAndUpdate({
      userId: req.body.userId,
      categoryId: req.body.categoryId,
    }, {difficulty: req.body.difficulty}, { upsert: true }).then((err, saved) => {
      if (err != null) {
        res.json(err);
      } else {
        res.json(saved);
      }
    });
  });
}
