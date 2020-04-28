var svgCaptcha = require('svg-captcha');
var User = require('../models/user');

module.exports = (app, passport) => {

  app.get('/auth-status', (req, res) => {
    var user = null;
    if (req.isAuthenticated()) {
      user = JSON.parse(JSON.stringify(req.user));
      delete user.password;
    }
    res.json({ authenticated: req.isAuthenticated() , user: user });
  });

  // LOGIN ---------------------------------------------------------------------
  app.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.post('/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (user === false) {
        var json = { status: 'error' };
        if (typeof info === 'string') {
          json.message = info;
        } else if (typeof info === 'object' && info.message != null) {
          json.message = info.message;
        } else {
          json.message = 'Invalid credentials';
        }
        res.json(json);
      } else {
        req.logIn(user, (err) => {
          if (err) { res.json({ status: 'error', message: 'Server error' }); }
            delete user.password;
          return res.json({ status: 'success', user: user });
        });
      }
    })(req, res, next);
  });

  // SIGNUP --------------------------------------------------------------------
  app.get('/signup', (req, res) => {
    var captcha= svgCaptcha.create();
    req.session.captcha = captcha.text;
    res.render('signup.ejs', {
      message: req.flash('signupMessage'),
      captcha: captcha.data
    });
  });

  app.post('/signup', (req, res, next) => {
    console.log(res)
    passport.authenticate('local-signup', (err, user, info) => {
      if (user === false) {
        var json = { status: 'error' };
        if (typeof info === 'string') {
          json.message = info;
        } else if (typeof info === 'object' && info.message != null) {
          json.message = info.message;
        } else {
          json.message = 'Error occurred';
        }
        res.json(json);
      } else {
        res.json({ status: 'created' });
      }
    })(req, res, next);
  });
}
